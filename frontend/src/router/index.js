import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "user.home",
        component: () => import("../views/client/home/Home.vue"),
    },
    {
        path: "/books",
        name: "books.list",
        component: () => import("../views/client/books/List.vue"),
    },
    {
        path: "/books/:slugBook",
        name: "books.detail",
        component: () => import("../views/client/books/Detail.vue"),
    },
    {
        path: "/orders",
        name: "books.order",
        component: () => import("../views/client/orders/List.vue"),
    },
    {
        path: "/my-user/info",
        name: "user.info",
        component: () => import("../views/client/myUser/Info.vue"),
    },
    {
        path: "/admin/dashboard",
        name: "admin.dashboard",
        component: () => import("../views/admin/dashboard/Dashboard.vue"),
    },
    {
        path: "/admin/orders",
        name: "admin.orders",
        component: () => import("../views/admin/orders/List.vue"),
    },
    {
        path: "/admin/orders/detail/:id",
        name: "admin.orders.detail",
        component: () => import("../views/admin/orders/Detail.vue"),
    },
    {
        path: "/admin/accounts",
        name: "admin.accounts",
        component: () => import("../views/admin/accounts/List.vue"),
    },
    {
        path: "/admin/accounts/detail/:id",
        name: "admin.accounts.detail",
        component: () => import("../views/admin/accounts/Detail.vue"),
    },
    {
        path: "/admin/accounts/create",
        name: "admin.accounts.create",
        component: () => import("../views/admin/accounts/Create.vue"),
    },
    {
        path: "/admin/accounts/edit/:id",
        name: "admin.accounts.edit",
        component: () => import("../views/admin/accounts/Create.vue"),
    },
    {
        path: "/admin/books",
        name: "admin.books",
        component: () => import("../views/admin/books/List.vue"),
    },
    {
        path: "/admin/books/detail/:id",
        name: "admin.books.detail",
        component: () => import("../views/admin/books/Detail.vue"),
    },
    {
        path: "/admin/books/create",
        name: "admin.books.create",
        component: () => import("../views/admin/books/Create.vue"),
    },
    {
        path: "/admin/books/edit/:id",
        name: "admin.books.edit",
        component: () => import("../views/admin/books/Create.vue"),
    },
    {
        path: "/admin/publishers",
        name: "admin.publishers",
        component: () => import("../views/admin/publishers/List.vue"),
    },
    {
        path: "/admin/publishers/detail/:id",
        name: "admin.publishers.detail",
        component: () => import("../views/admin/publishers/Detail.vue"),
    },
    {
        path: "/admin/publishers/create",
        name: "admin.publishers.create",
        component: () => import("../views/admin/publishers/Create.vue"),
    },
    {
        path: "/admin/publishers/edit/:id",
        name: "admin.publishers.edit",
        component: () => import("../views/admin/publishers/Create.vue"),
    },
    {
        path: "/admin/users",
        name: "admin.users",
        component: () => import("../views/admin/users/List.vue"),
    },
    {
        path: "/admin/users/detail/:id",
        name: "admin.users.detail",
        component: () => import("../views/admin/users/Detail.vue"),
    },
    {
        path: "/admin/users/create",
        name: "admin.users.create",
        component: () => import("../views/admin/users/Create.vue"),
    },
    {
        path: "/admin/users/edit/:id",
        name: "admin.users.edit",
        component: () => import("../views/admin/users/Create.vue"),
    },
    {
        path: "/admin/auth/login",
        name: "admin.login",
        component: () => import("../views/admin/auth/Login.vue"),
    },
    {
        path: "/auth/login",
        name: "user.login",
        component: () => import("../views/client/auth/Login.vue"),
    },
    {
        path: "/auth/register",
        name: "user.register",
        component: () => import("../views/client/auth/Register.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
