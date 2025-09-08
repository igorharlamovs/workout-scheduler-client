const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/HomePage.vue'),
      },

      {
        path: 'workouts',
        component: () => import('layouts/WorkoutLayout.vue'),
        children: [],
      },

      {
        path: '',
        component: () => import('layouts/PlanLayout.vue'),
        children: [
          {
            path: 'planlist',
            component: () => import('pages/PlanPage.vue'),
          },
        ],
      },

      {
        path: 'register',
        component: () => import('pages/RegisterPage.vue'),
      },

      {
        path: 'login',
        component: () => import('pages/LoginPage.vue'),
      },

      {
        path: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
