import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "loginView" */ "../views/LoginView.vue"),
  },
  {
    path: "/",
    name: "layout",
    component: () =>
      import(/* webpackChunkName: "layoutView" */ "../views/LayoutView.vue"),
    redirect: "goods",
    children: [
      {
        path: "goods",
        name: "goods",
        meta: {
          isShow: true,
          title: "商品列表",
        },
        component: () =>
          import(/* webpackChunkName: "GoodsView" */ "../views/GoodsView.vue"),
      },
      {
        path: "role",
        name: "role",
        meta: {
          isShow: true,
          title: "角色列表",
        },
        component: () =>
          import(/* webpackChunkName: "RoleView" */ "../views/RoleView.vue"),
      },
      {
        path: "user",
        name: "user",
        meta: {
          isShow: true,
          title: "用户列表",
        },
        component: () =>
          import(/* webpackChunkName: "UserView" */ "../views/UserView.vue"),
      },
      {
        path: "authority",
        name: "authority",
        meta: {
          isShow: false,
          title: "权限列表",
        },
        component: () =>
          import(
            /* webpackChunkName: "authority" */ "../views/AuthorityView.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
