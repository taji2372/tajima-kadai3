<template>
  <header class="app-header">
    <div class="header">
      <v-row class="pt-3">
        <v-col cols="1"></v-col>
        <v-col cols="11" class="text-h5 pl-15"
          ><span>Taji Blog</span>
          <v-btn variant="text" class="mr-2 ml-10">
            <router-link to="/" class="tab" :class="{ active: $route.path === '/' }">
              HOME
            </router-link>
          </v-btn>
          <span class="bar">｜</span>
          <v-btn variant="text" class="mr-2">
            <router-link to="/genre1" class="tab" :class="{ active: $route.path === '/genre1' }">
              DIARY
            </router-link>
          </v-btn>
          <span class="bar">｜</span>
          <v-btn variant="text" class="mr-2">
            <router-link to="/genre2" class="tab" :class="{ active: $route.path === '/genre2' }">
              LIFEHACK
            </router-link>
          </v-btn>
          <span class="bar">｜</span>
          <v-btn variant="text" class="mr-2">
            <router-link to="/genre3" class="tab" :class="{ active: $route.path === '/genre3' }">
              FASHION
            </router-link>
          </v-btn>
          <span class="bar">｜</span>
          <v-btn variant="text" class="mr-3">
            <router-link to="/post" class="tab" :class="{ active: $route.path === '/post' }">
              NEW POST
            </router-link>
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </header>

  <main class="container">
    <router-view />
  </main>
</template>
<style>
.app-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
}

.header {
  height: 75px;
  /* background: linear-gradient(80deg, #e0ccb8, #e0ccb8); */
  color: rgb(43, 43, 43);
  background-color: rgb(216, 191, 165);
  background-size: cover;
}

span {
  font-family: 'Comic Sans MS';
  font-weight: normal;
}

.v-btn {
  text-transform: none;
  color: rgb(43, 43, 43);
}

.tab {
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
}

.tab.active {
  color: rgb(180, 130, 70);
  border-bottom: 2px solid rgb(180, 130, 70);
  padding-bottom: 2px;
}

.bar {
  color: rgba(0, 0, 0, 0.158);
  margin: 0 8px;
}

.ql-size-large {
  font-size: 20px;
}

.ql-size-huge {
  font-size: 30px;
}

/* .menu {
  background-color: rgb(235, 222, 207);
} */

/* .tabs {
  height: 70px;
  background: linear-gradient(90deg, #b3b3b3, #e0e0e0);
  color: white;
} */
</style>
