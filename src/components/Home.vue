<template>
    

    <!-- Contenido -->
    <v-row justify="center" align="center">
      <v-col cols="12">HOME</v-col>
    </v-row>


</template>

<script>
export default {
  name: "Home",
  methods: {
    reloadBalance() {
      // Aquí puedes agregar la lógica para recargar el saldo
      console.log("Recargar Saldo");
    },
    checkBalance() {
      // Aquí puedes agregar la lógica para consultar el saldo
      console.log("Consultar Saldo");
    },
  },
};
</script>
