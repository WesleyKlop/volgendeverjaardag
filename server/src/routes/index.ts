import { createRouter } from "@deno/x/router";
import birthdays from "./birthdays.ts";
import health from "./health.ts";

const router = createRouter({
  ...health,
  ...birthdays,
});

export default router;
