<template>
  <header>
    <h1>{{ title }}</h1>
    <p>{{ subTitle }}</p>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: ["title", "subTitle"],
};
</script>

<style></style>
