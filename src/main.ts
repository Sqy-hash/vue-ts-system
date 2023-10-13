import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/font/iconfont.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

const app: any = createApp(App);
app.use(router).mount("#app");
app.use(ElementPlus);
