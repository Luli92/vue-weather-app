<template>
  <div v-if="dailyWeatherData">
    <div
      v-for="(dailyForecast, index) in dailyWeatherData"
      :key="index"
      class="daily-forecast"
    >
      <div>
        {{ dailyForecast.hour }}
      </div>
      <div>{{ dailyForecast.temperature }}<span>°C</span></div>
      <div>
        <img src="@/assets/icons/mock-icon.svg" />
        {{ dailyForecast.icon }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DailyList",
  props: ["dailyWeatherData"],
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
};
</script>

<style scoped>
.daily-forecast {
  margin: 15px;
  display: flex;
  font-size: 0.8rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  opacity: 90%;
}
</style>
