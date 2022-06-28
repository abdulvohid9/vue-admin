import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
// import Test from "../components/Test.vue";
import CreateQuote from "../views/quote/form/createQuote";
import UpdateQuote from "../views/quote/form/updateQuote";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/quote",
    name: "quote",
    component: () => import("../views/quote/tableQuotes"),
  },
  {
    path: "/quote/create",
    name: "createQuote",
    component: CreateQuote,
  },
  {
    path: "/quote/:id",
    name: "updateQuote",
    component: UpdateQuote,
  },
  {
    path: "/autor",
    name: "autor",
    component: () => import("../views/autor/tableAutors"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
