export default [
  {
    name: "login",
    path: "/",
    component: import('./../pages/login'),
  },
  {
    name: "register",
    path: "/register",
    component: import('./../pages/register'),
  },
  {
    name: "Master",
    path: "/home",
    component: import('./../pages/layout/master'),
    redirect: '/dashboard',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: import('./../pages/dashboard'),
      }
    ]
    },

]