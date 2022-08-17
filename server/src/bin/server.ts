import serve from "../app.ts";
import { getPool } from "../utils/db.ts";
import "../utils/migrations.ts";

Deno.addSignalListener("SIGTERM", async () => {
  console.log("Got SIGTERM");
  await getPool().end();
  Deno.exit();
});

await serve();
