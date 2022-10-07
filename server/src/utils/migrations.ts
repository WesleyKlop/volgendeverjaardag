import { PoolClient } from "../deps.ts";
import { getPool } from "./db.ts";

const doesMigrationsTableExist = async (
  connection: PoolClient,
): Promise<boolean> => {
  const { rows } = await connection.queryObject<{ exists: boolean }>`
    SELECT EXISTS ( 
        SELECT FROM information_schema.tables
        WHERE       table_schema = 'public'
        AND         table_name = 'migrations'
    )`;

  return rows.length > 0 && rows[0].exists === true;
};

const createMigrationsTable = async (
  connection: PoolClient,
): Promise<void> => {
  await connection.queryObject<never>`
    CREATE TABLE migrations (
        id serial NOT NULL,
        name text NOT NULL,

        PRIMARY KEY (id)
    );
  `;
};

const discoverMigrations = async () => {
  const migrations = new Set<string>();
  for await (const entry of Deno.readDir("./migrations")) {
    if (entry.isDirectory) {
      migrations.add(entry.name);
    }
  }

  return migrations;
};
const hasPendingMigration = async (
  connection: PoolClient,
  migrationName: string,
): Promise<boolean> => {
  const { rows } = await connection.queryObject<{ exists: boolean }>`
    SELECT EXISTS (
      SELECT FROM migrations WHERE name = ${migrationName}
    )
  `;
  return rows.length > 0 && rows[0].exists === false;
};

const readMigration = async (migration: string, direction: "up" | "down") => {
  const decoder = new TextDecoder("utf-8");
  const content = await Deno.readFile(
    `./migrations/${migration}/${direction}.sql`,
  );
  return decoder.decode(content);
};

const executeMigration = async (
  connection: PoolClient,
  migrationName: string,
  direction: "up" | "down" = "up",
) => {
  console.log(`Executing migration ${migrationName}: ${direction}`);
  const migration = await readMigration(migrationName, direction);

  await connection.queryArray(migration);

  await connection.queryArray`
    INSERT INTO migrations (name) VALUES (${migrationName})
  `;
};

const connection = await getPool().connect();
try {
  const exists = await doesMigrationsTableExist(connection);

  if (!exists) {
    await createMigrationsTable(connection);
  }
  const migrations = await discoverMigrations();

  for (const migration of migrations) {
    if (await hasPendingMigration(connection, migration)) {
      await executeMigration(connection, migration, "up");
    }
  }
} finally {
  connection.release();
}
