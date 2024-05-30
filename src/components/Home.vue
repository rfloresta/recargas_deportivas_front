<template>
    

    <!-- Contenido -->
    <v-row justify="center" align="center">
      <p>
        HOME
      </p>
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
