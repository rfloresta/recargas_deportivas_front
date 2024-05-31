<template>
  <div>
    <!-- Card para el formulario -->
    <v-card class="mt-8">
      <!-- Encabezado de la tarjeta con el título -->
      <v-card-title class="text-h5">Recargar saldo</v-card-title>

      <!-- Contenido del formulario -->
      <v-card-text>
        <!-- Formulario de recargar saldo -->
        <v-form ref="form" @submit.prevent="submitForm">
          <v-text-field
            v-model="playerId"
            label="Player ID"
            :rules="codeRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="amount"
            label="Monto"
            type="number"
            :rules="moneyRules"
            required
          ></v-text-field>

          <!-- Combo box para seleccionar el banco -->
          <v-select
            v-model="bank"
            :items="bankOptions"
            label="Banco"
            :rules="rules"
            required
          ></v-select>

          <!-- Combo box para seleccionar el canal de comunicación -->
          <v-select
            v-model="communicationChannel"
            :items="communicationChannelOptions"
            label="Canal de Comunicación"
            :rules="rules"
            required
          ></v-select>

          <!-- Botón para enviar el formulario -->
          <v-btn color="red" type="submit">Registrar Recarga</v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="snackbar.show"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      top
      right
    >
      {{ snackbar.message }}
      <v-btn text @click="snackbar.show = false"> Cerrar </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReloadBalance",
  data() {
    return {
      playerId: "",
      amount: null,
      bank: null,
      communicationChannel: null,
      bankOptions: [],
      communicationChannelOptions: [],
      snackbar: {
        show: false, // Indica si la snackbar está visible o no
        timeout: 5000, // Tiempo en milisegundos que la snackbar estará visible
        color: "", // Color de la snackbar (puede ser 'success', 'error', 'info', 'warning')
        message: "", // Mensaje que se mostrará en la snackbar
      },
      codeRules: [
        (value) => !!value || "Campo Requerido.",
        (value) => (value && value.length >= 3) || "Minimo 3 caracteres",
      ],
      rules: [(value) => !!value || "Campo Requerido."],
      moneyRules: [
        (value) => !!value || "Campo Requerido.",
        (value) =>
          /^\d+(\.\d{1,2})?$/.test(value) ||
          "Monto inválido. Ejemplo válido: 100, 100.50",
      ],
    };
  },
  mounted() {
    this.getBanks();
    this.getComunicationChanel();
  },
  methods: {
    async submitForm() {
      // Validar el formulario antes de enviar los datos
      const isValid = this.$refs.form.validate();

      // Si el formulario no es válido, no enviar los datos
      if (!isValid) {
        return;
      }

      const formData = {
        player_id: this.playerId,
        monto: this.amount,
        foto_voucher:
          "https://imgv2-2-f.scribdassets.com/img/document/358541868/original/f077a82030/1714432479?v=1",
        banco_id: this.bank, // Enviamos el ID del banco
        canal_id: this.communicationChannel, // Enviamos el ID del canal de comunicación
        usuario_id: 1,
      };

      try {
        console.log("formData", formData);
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/recargas`,
          formData
        );
        const { message } = data;
        this.showAlert(message, "success"); // Muestra una alerta verde de éxito
        this.resetForm();
      } catch (error) {
        console.error("Error:", error);
        const { response } = error;
        if (response) {
          this.showAlert(response.data.message, "error");
        }
      }
    },
    resetForm() {
      this.playerId = "";
      this.amount = null;
      this.bank = null;
      this.communicationChannel = null;
    },
    showAlert(message, color = "info") {
      this.snackbar.show = true;
      this.snackbar.color = color;
      this.snackbar.message = message;
    },
    async getBanks() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/bancos`);
        this.bankOptions = data.data.map((bank) => ({
          value: bank.id,
          title: bank.descripcion,
        }));
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async getComunicationChanel() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/canales`);
        this.communicationChannelOptions = response.data.data.map((chanel) => ({
          value: chanel.id,
          title: chanel.nombre,
        }));
        // this.communicationChannelOptions = this.communicationChannelOptions.value;
        console.log("response data", response.data.data);
        console.log("communicationChannelOptions", this.communicationChannelOptions);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>
