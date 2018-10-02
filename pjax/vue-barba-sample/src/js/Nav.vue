<template>
  <nav>
    <ul>
      <li>
        <a
          :class="{ 'is-active' : active === 'index' }"
          href="/"
          @click="makeActive('index')">Index
        </a>
      </li>
      <li>
        <a
          :class="{ 'is-active' : active === 'about' }"
          href="/about.html"
          @click="makeActive('about')">About
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function() {
    return {
      active: 'home'
    };
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
};
</script>

<style scoped>
.is-active {
  color: red;
}
</style>
