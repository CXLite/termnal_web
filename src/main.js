// Polyfill for replaceChildren
if (!Element.prototype.replaceChildren) {
    Element.prototype.replaceChildren = function(...nodes) {
      while (this.firstChild) {
        this.removeChild(this.firstChild);
      }
      this.append(...nodes);
    };
}

import 'globalthis/polyfill';
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
