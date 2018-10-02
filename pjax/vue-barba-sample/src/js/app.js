import '../scss/entry.scss';
import Vue from 'vue';
import Nav from './Nav.vue';
import Barba from 'barba.js';

new Vue({
  el: '#nav',
  data: {
    active: ''
  },
  created() {
    let path = location.pathname;
    path = path.replace(/^\/|\.html/g, '');
    this.active = path !== '' ? path : 'index';
  },
  methods: {
    makeActive: function(item) {
      this.active = item;
    }
  }
});

new Vue({
  el: '#nav2',
  components: {
    'nav-list': Nav
  }
});

document.addEventListener('DOMContentLoaded', () => {
  Barba.Pjax.start();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', () => {
    console.log('linkClicked');
  });
});
