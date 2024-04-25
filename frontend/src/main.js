import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import "./assets/css/style.css";
import "./assets/admin/css/style.css";

import VueAxios from "vue-axios";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const app = createApp(App).use(router);
app.use(VueAxios, { $request: axios });
app.use(VueSweetalert2);
app.use(require("vue-cookies"));

app.mount("#app");
