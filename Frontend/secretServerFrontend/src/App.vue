<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div>
      <nav>
        <div class="button-home">
          <RouterLink class="home" :to="{ name: 'Home' }">Home</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <RouterView/>
</template>

<style scoped>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.page-slide-enter-active,
.page-slide-leave-active {
  transition: 400ms ease all;
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
  transform: translate(60px);
}

#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

header .wrapper nav {
  display: flex;
  gap: 16px;
}

.button-home {
  width: fit-content;
  border: 1px solid #d3d3d3;
  background-color: #dadada;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.671);
  border-radius: 4px;
  font-size: 12px;
  margin: 20px;
  margin-bottom: 30px;
  text-decoration: none;
}
.home {
  text-decoration: none;
  padding: 10px;
  color: #000;
  font-size: 20px;
}
</style>

