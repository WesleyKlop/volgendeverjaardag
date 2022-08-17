import { serve } from "@deno/http";
import router from "./routes/index.ts";

const port = parseInt(Deno.env.get("APP_PORT") ?? "8080", 10);
const hostname = Deno.env.get("APP_HOSTNAME") ?? "0.0.0.0";

console.log(`Running at http://${hostname}:${port}`);

export default () => serve(router, { port, hostname });
