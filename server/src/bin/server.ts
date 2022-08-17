import serve from "../app.ts";
import { getPool } from "../utils/db.ts";

Deno.addSignalListener("SIGTERM", async () => {
  await getPool().end();
  Deno.exit();
});

await serve();
