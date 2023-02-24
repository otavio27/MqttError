const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/HomeComponent.vue") },
    ],
  },
  {
    path: "/devices",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/devices",
        component: () => import("pages/DevicesComponent.vue"),
      },
    ],
  },
  {
    path: "/settings",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/settings",
        component: () => import("pages/SettingsComponent.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/login",
        component: () => import("pages/LoginComponent.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
