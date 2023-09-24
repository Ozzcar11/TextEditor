import "@/assets/fonts/index.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
