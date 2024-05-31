<template>
  <div>
    <!-- Card para la consulta de recargas -->
    <v-card class="mt-8">
      <!-- Encabezado de la tarjeta con el título -->
      <v-card-title class="text-h5">Consultar Saldo</v-card-title>

      <!-- Contenido del card -->
      <v-card-text>
        <!-- Input para buscar por Player ID -->
        <v-text-field
          v-model="searchQuery"
          label="Buscar por Player ID"
          placeholder="Ingrese el Player ID"
          outlined
          dense
          :rules="searchRules"
          @keydown.enter="search"
        ></v-text-field>

        <v-card v-show="cliente.saldo" class="mx-auto mb-4" max-width="350">
          <v-row align="center">
            <!-- Columna para el icono -->
            <v-col cols="4" class="text-center">
              <v-avatar size="x-large">
                <v-img alt="John" src="https://cdn-icons-png.flaticon.com/512/3444/3444339.png"></v-img>
              </v-avatar>
            </v-col>

            <!-- Columna para los nombres y el saldo -->
            <v-col cols="8" class="pl-0">
              <v-card-title class="pl-0">
                <span>{{ cliente.nombres }} {{ cliente.apellidos }}</span>
              </v-card-title>
              <v-card-text class="pl-0">
                <div class="text-h5">Saldo Total: {{ cliente.saldo }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <v-table v-show="recargas.length > 0" height="300px" fixed-header>
          <thead>
            <tr>
              <th class="text-left">Monto</th>
              <th class="text-left">Banco</th>
              <th class="text-left">Canal de Comunicación</th>
              <th class="text-left">Fecha</th>
              <th class="text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in recargas" :key="item.name">
              <td>{{ item.monto }}</td>
              <td>{{ item.banco }}</td>
              <td>{{ item.canal }}</td>
              <td>{{ item.fecha_hora }}</td>
              <td>
                <!-- Botón para editar el registro -->
                <v-btn color="primary" @click="openEditModal(item)">Editar</v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>

    <!-- Modal para editar la recarga -->
    <v-dialog v-model="editModal" max-width="600">
      <v-card class="mt-8">
        <!-- Encabezado de la tarjeta con el título -->
        <v-card-title class="text-h5">Editar Recarga</v-card-title>

        <!-- Contenido del formulario -->
        <v-card-text>
          <!-- Formulario de recargar saldo -->
          <v-form ref="form" @submit.prevent="submitForm">
            <v-text-field
              v-model="recargaSeleccionada.monto"
              label="Monto"
              type="number"
              :rules="moneyRules"
              required
            ></v-text-field>

            <!-- Combo box para seleccionar el banco -->
            <v-select
              v-model="recargaSeleccionada.banco_id"
              :items="bankOptions"
              label="Banco"
              :rules="rules"
              required
            ></v-select>

            <!-- Combo box para seleccionar el canal de comunicación -->
            <v-select
              v-model="recargaSeleccionada.canal_id"
              :items="communicationChannelOptions"
              label="Canal de Comunicación"
              :rules="rules"
              required
            ></v-select>

            <!-- Botón para enviar el formulario -->
            <v-btn color="red" type="submit">Actualizar Recarga</v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-dialog>

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
  data() {
    return {
      searchQuery: "", // Consulta de búsqueda por Player ID
      recargas: [], // Datos de las recargas para la tabla
      editModal: false, // Estado del modal de edición
      recargaSeleccionada: null, // Recarga seleccionada para editar
      bankOptions: [],
      communicationChannelOptions: [],
      rules: [(value) => !!value || "Campo Requerido."],
      cliente: {},
      moneyRules: [
        (value) => !!value || "Campo Requerido.",
        (value) =>
          /^\d+(\.\d{1,2})?$/.test(value) ||
          "Monto inválido. Ejemplo válido: 100, 100.50",
      ],
      snackbar: {
        show: false, // Indica si la snackbar está visible o no
        timeout: 5000, // Tiempo en milisegundos que la snackbar estará visible
        color: "", // Color de la snackbar (puede ser 'success', 'error', 'info', 'warning')
        message: "", // Mensaje que se mostrará en la snackbar
      },
    };
  },
  computed: {
    // Filtrar recargas basadas en la búsqueda
    filteredRecargas() {
      return this.recargas.filter((recarga) =>
        recarga.playerId.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    // Reglas de validación para el campo de búsqueda
    searchRules() {
      return [
        (value) => !!value || "Campo requerido.",
        (value) => (value && value.length >= 3) || "Debe tener al menos 3 caracteres",
      ];
    },
  },
  methods: {
    showAlert(message, color = "info") {
      this.snackbar.show = true;
      this.snackbar.color = color;
      this.snackbar.message = message;
    },
    // Método para abrir el modal de edición y cargar los datos del registro seleccionado
    openEditModal(recarga) {
      this.recargaSeleccionada = {...recarga};
      this.editModal = true;
    },
    // Método para guardar los cambios del modal de edición
    async submitForm() {
      // Validar el formulario antes de enviar los datos
      const isValid = this.$refs.form.validate();

      // Si el formulario no es válido, no enviar los datos
      if (!isValid) {
        return;
      }

      try {
        this.recargaSeleccionada.usuario_id = 1; // Aquí se debe obtener el ID del usuario que está realizando la edición

        const { data } = await axios.put(
          "http://recargas_deportivas.test/recargas/" +
            this.recargaSeleccionada.recarga_id,
          this.recargaSeleccionada
        );

        const { message } = data;
        this.showAlert(message, "success"); // Muestra una alerta verde de éxito
        this.editModal = false;
        this.search()
      } catch (error) {
        console.error("Error:", error);
        const { response } = error;

        if (response) {
          this.showAlert(response.data.message, "error");
        }
      }
    },
    async search() {
      await this.getClienteByPlayerID();
      await this.getRecargasByPlayerID();
    },
    async getRecargasByPlayerID() {
      try {
        const { data } = await axios.get(
          "http://recargas_deportivas.test/recargas/player/" + this.searchQuery
        );
        this.recargas = data.data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async getClienteByPlayerID() {
      try {
        const { data } = await axios.get(
          "http://recargas_deportivas.test/cliente/player/" + this.searchQuery
        );
        this.cliente = data.data;
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async getBanks() {
      try {
        const { data } = await axios.get("http://recargas_deportivas.test/bancos");
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
        const response = await axios.get("http://recargas_deportivas.test/canales");
        this.communicationChannelOptions = response.data.data.map((chanel) => ({
          value: chanel.id,
          title: chanel.nombre,
        }));
        // this.communicationChannelOptions = this.communicationChannelOptions.value;
        console.log("response data", response.data.data);
        console.log("communicationChannelOptions", this.communicationChannelOptions);
      } catch (error) {
        console.error("Error al obtener los canales:", error);
      }
    },
  },
  mounted() {
    this.getComunicationChanel();
    this.getBanks();
  },
};
</script>
