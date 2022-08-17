import { Pool, PoolClient } from "@deno/x/postgres";

const connectionUrl = new URL(Deno.env.get("DATABASE_URL") as string);
let _pool: Pool;
export const getPool = () =>
  _pool ||= new Pool(connectionUrl.toString(), 4, true);

type Transaction<T> = (client: PoolClient) => Promise<T>;

export const doInTransaction = async <T = void>(
  transaction: Transaction<T>,
) => {
  const pool = getPool();
  const client = await pool.connect();

  let result: T;
  try {
    result = await transaction(client);
  } finally {
    client.release();
  }

  return result;
};
