// src/router/index.ts
import { createRouter, createWebHistory } from "vue-router";
import { authRoutes } from "@/modules/auth/router/auth.routes";
import { adminRoutes } from "./routes/admin.routes";
import { authGuard } from "./guards/auth.guard";
const routes = [
  ...authRoutes,
  ...adminRoutes,
  {
    path: "/",
    redirect: "/login",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

authGuard(router);

export default router;
