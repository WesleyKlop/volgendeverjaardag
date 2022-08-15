import { createRouter } from "@deno/x/router";
import { DateTime } from "@moment/luxon";
import group from "./group.ts";
import health from "./health.ts";

const router = createRouter({
  ...health,
  ...group,
});

export default router;
