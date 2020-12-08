<template>
  <div class="display-coord">Lat: {{ latitude }} Long: {{ longitude }}</div>
</template>

<script>
export default {
  props: ["latitude", "longitude"],
};
</script>

<style scoped>
.display-coord {
  padding-bottom: 15px;
}
</style>
