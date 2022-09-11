import serve from "../app.ts";
import { getPool, hasPool } from "../utils/db.ts";
import "../utils/migrations.ts";

Deno.addSignalListener("SIGTERM", async () => {
  console.log("Got SIGTERM");
  if (hasPool()) {
    await getPool().end();
  }
  Deno.exit();
});

await serve();
