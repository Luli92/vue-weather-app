<template>
  <form class="input-form" @submit.prevent="sendInput">
    <div class="input-field">
      <input type="text" placeholder="Latitud" v-model="latitudeInput" />
      <span class="error-text" v-if="errors.latCoordError">
        {{ errors.latCoordError }}
      </span>
    </div>
    <div class="input-field">
      <input type="text" placeholder="Longitud" v-model="longitudeInput" />
      <span class="error-text" v-if="errors.longCoordError">
        {{ errors.longCoordError }}
      </span>
    </div>

    <div class="submit-button">
      <button type="submit">
        Visa väderprognos
      </button>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      latitudeInput: null,
      longitudeInput: null,
      errors: {},
      validLat: false,
      validLong: false,
    };
  },
  methods: {
    sendInput() {
      try {
        this.errors = {};
        // Validate input before sending it to the parent component
        const validLatitude = this.validateCoords(this.latitudeInput, true);
        this.errors.latCoordError = validLatitude.error;
        this.validLat = validLatitude.valid;

        const validLongitude = this.validateCoords(this.longitudeInput, false);
        this.errors.longCoordError = validLongitude.error;
        this.validLong = validLongitude.valid;

        // If valid coords, we emit an event that the parent component is listening to
        if (this.validLong && this.validLat) {
          this.$emit("sentInput", {
            latitudeInput: this.latitudeInput,
            longitudeInput: this.longitudeInput,
          });
          // Reset inputfield
          this.latitudeInput = "";
          this.longitudeInput = "";
        }
      } catch (error) {
        console.log(error);
      }
    },
    // We check the input if it matches the regex for lat and long, return errors if not
    validateCoords(coordinate, isLatitude) {
      if (!coordinate) {
        return {
          valid: false,
          error: "Båda fälten är nödvändiga",
        };
      }
      // Different regex for lat and long, so we pass a boolean "isLatitude" to the function
      if (isLatitude) {
        const latitudeRegex = /^(-?[1-8]?\d(?:\.\d{1,18})?|90(?:\.0{1,18})?)$/;
        const validLatitude = latitudeRegex.test(coordinate);

        if (!validLatitude) {
          return {
            valid: false,
            error: "Vänligen ange godkänd latitud-koordinat.",
          };
        }
      }

      if (!isLatitude) {
        const longitudeRegex = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,18})?|180(?:\.0{1,18})?)$/;
        const validLongitude = longitudeRegex.test(coordinate);

        if (!validLongitude) {
          return {
            valid: false,
            error: "Vänligen ange godkänd longitud-koordinat.",
          };
        }
      }

      return { valid: true, error: null };
    },
  },
};
</script>

<style scoped>
.input-form {
  display: flex;
  justify-content: center;
  width: 50%;
  margin: auto;
  flex-wrap: wrap;
}

.input-field {
  display: flex;
  flex-direction: column;
  padding: 15px;
  height: 100px;
  width: 150px;
}

.submit-button {
  padding: 15px;
  height: 100px;
  width: 150px;
}

.error-text {
  font-size: 0.8rem;
  color: red;
  padding: 5px;
}
</style>
