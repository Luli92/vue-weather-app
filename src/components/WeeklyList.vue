<template>
  <div v-if="weatherData">
    <div>
      <div
        v-for="(location, index) in weatherData"
        :key="index"
        @click="toggleDailyForecast(index)"
        class="weeklyForecast"
      >
        <div class="forecast-row">
          <div class="forecast-row-item">{{ location.nameOfDay }}</div>
          <div class="forecast-row-item">
            {{ location.displayTemp }} <span>°C</span>
          </div>
          <div class="forecast-row-item">
            <img src="@/assets/icons/mock-icon.svg" />
            {{ location.icon }}
          </div>
        </div>

        <div v-show="location.showForecast">
          <DailyList
            :dailyWeatherData="location.dailyWeatherForecast"
          ></DailyList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeeklyList",
  props: {
    weatherData: Array,
  },

  components: {
    DailyList: () => import("./DailyList"),
  },
  data() {
    return {
      publicPath: process.env.BASE_URL,
    };
  },
  methods: {
    async toggleDailyForecast(index) {
      this.weatherData[index].showForecast = !this.weatherData[index]
        .showForecast;
    },
  },
};
</script>

<style scoped>
.weeklyForecast {
  width: 50%;
  margin: auto;
  text-align: center;
}

.forecast-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  padding: 5px;
  text-align: center;
  border-bottom: 0.5px solid black;
  cursor: pointer;
}

.forecast-row-item {
  text-align: center;
  max-width: 80px;
  padding: 5px;
}
.forecast-row:hover {
  transform: scale(1.02);
}
</style>
