<template>
  <v-app>
    <v-app-bar app style="background-color: rgb(235, 0, 0, 0.9)">
      <!-- Título del navbar -->
      <v-toolbar-title>
        <v-img
          height="100"
          width="200"
          src="https://academia.r.worldssl.net/uploads/default/files/apuestatotal_home.webp"
          alt="Logo de Apuesta Total"
        ></v-img>
      </v-toolbar-title>

      <!-- Espaciador -->
      <v-spacer></v-spacer>

      <!-- Botones de navegación -->
      <v-btn class="mr-2" variant="flat" color="black" @click="goTo('/reload-balance')"
        >Recargar Saldo</v-btn
      >
      <v-btn variant="flat" @click="goTo('/check-balance')">Consultar Saldo</v-btn>
    </v-app-bar>
    <v-container class="mt-12">
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
  },
};
</script>
