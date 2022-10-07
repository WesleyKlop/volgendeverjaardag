import { Pool, PoolClient } from "../deps.ts";

const connectionUrl = new URL(Deno.env.get("DATABASE_URL")!);

let _pool: Pool;
export const getPool = () =>
  _pool ||= new Pool(connectionUrl.toString(), 4, true);
export const hasPool = () => typeof _pool !== "undefined";

type Transaction<T> = (client: PoolClient) => Promise<T>;

export const withConnection = async <T = void>(
  handler: Transaction<T>,
) => {
  const pool = getPool();
  const client = await pool.connect();

  let result: T;
  try {
    result = await handler(client);
  } finally {
    client.release();
  }

  return result;
};
