const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/user",
    component: () => import("layouts/UserLayout.vue"),
    children: [
      {
        path: "tab1",
        component: () => import("pages/UserPage.vue"),
      },
      {
        path: "tab2",
        component: () => import("pages/UserPage.vue"),
      },
      {
        path: "tab3",
        component: () => import("pages/UserPage.vue"),
      },
    ],
  },

  {
    path: "/homepage",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/HomePage.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
