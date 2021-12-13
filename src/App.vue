<template>
  <v-app>
    <v-app-bar
      app
      floating
      elevation="0"
      color="#B64D2F"
      dark
    >
      <div>
        <p class="app_bar_text">Информационно-управляющая система прототипа лесопильного цеха</p>
      </div>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
  }),
};
</script>

<style lang="scss" scoped>
.app_bar_text{
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  margin: 0 auto;
}
</style>