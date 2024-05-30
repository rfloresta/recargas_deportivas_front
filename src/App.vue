<template>
  <v-app>
    <v-app-bar app color="orange darken-2" dark>
      <v-toolbar-title>Recargas - Apuesta Total</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goTo('/reload-balance')">Recargar Saldo</v-btn>
      <v-btn text @click="goTo('/check-balance')">Consultar Saldo</v-btn>
    </v-app-bar>
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goTo(route) {
      this.$router.push(route);
    }
  }
}
</script>
