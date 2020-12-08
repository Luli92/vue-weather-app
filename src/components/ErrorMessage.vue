<template>
  <div class="error-message-container">
    <p>
      Hoppsan, någonting gick fel: {{ errorMessage }}<br />
      Se till att koordinaterna stämmer
    </p>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
  props: ["errorMessage"],
};
</script>

<style scoped>
.error-message-container {
  height: 150px;
  width: 50%;
  margin: auto;
  color: salmon;
  font-weight: bold;
  font-size: 1.2rem;
  opacity: 70%;
}
</style>
