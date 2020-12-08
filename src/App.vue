<template>
  <div id="app">
    <Header :title="title" :subTitle="subTitle" />
    <InputForm @sentInput="getWeatherData" />

    <CoordDisplay
      v-if="longitude && latitude && !error"
      :latitude="latitude"
      :longitude="longitude"
    />

    <WeeklyList v-if="weatherData" :weatherData="weatherData"></WeeklyList>

    <ErrorMessage v-if="error" :errorMessage="errorMessage" />

    <Loading v-if="loading" />
  </div>
</template>

<script>
import * as _ from "lodash";
import moment from "moment";

import { axiosGet } from "./utils";

export default {
  name: "App",
  components: {
    Header: () => import("./components/Header"),
    InputForm: () => import("./components/InputForm"),
    CoordDisplay: () => import("./components/CoordDisplay"),
    WeeklyList: () => import("./components/WeeklyList"),
    ErrorMessage: () => import("./components/ErrorMessage"),
    Loading: () => import("./components/Loading"),
  },
  data() {
    return {
      loading: null,
      weatherData: [],
      error: null,
      errorMessage: null,
      latitude: null,
      longitude: null,
      title: "Väderapp",
      subTitle: "För svenska koordinater",
    };
  },
  computed: {},
  methods: {
    toggleDailyForecast(index) {
      this.weatherData[index].showForecast = !this.weatherData[index]
        .showForecast;
    },
    // Deconstructed params comes from the event triggered in the InputForm component
    async getWeatherData({ latitudeInput, longitudeInput }) {
      try {
        this.loading = true;
        this.latitude = latitudeInput;
        this.longitude = longitudeInput;

        const path = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${longitudeInput}/lat/${latitudeInput}/data.json`;
        const weatherResult = await axiosGet(path);

        if (weatherResult.message) {
          this.errorMessage = weatherResult.message;
          this.loading = false;
          return (this.error = true);
        }

        const parsedWeatherData = this.parseWeatherDataFromAPI(
          weatherResult.data
        );

        this.weatherData = parsedWeatherData;
        this.loading = false;
        this.error = false;
      } catch (error) {
        console.log(error);
        this.loading = false;
        this.error = true;
        this.errorMessage = error.message;
      }
    },
    parseWeatherDataFromAPI(weatherDataFromAPI) {
      // We group the data from SMHI by key:day value:[{forecasts},{forecasts}]
      const dailyWeatherGroups = _.groupBy(
        weatherDataFromAPI.timeSeries,
        (date) => moment(date.validTime).startOf("day")
      );

      const parsedWeatherData = [];

      // Loops over the keys in our grouped object and populates our parsedWeatherData
      // with objects that we can iterate over
      for (const day in dailyWeatherGroups) {
        let icon;
        let displayTemp;

        dailyWeatherGroups[day].forEach((hour) => {
          // Checks if we have the 12:00 forecast for the days. If we do, we set displaytemp and icon to it.
          // Otherwise we have done the call after 12:00 and we set it to the first forecast that we have for today.
          if (hour.validTime.includes("12:00:00Z")) {
            displayTemp = hour.parameters[1].values[0];
            icon = hour.parameters[18].values[0];
          } else {
            displayTemp = dailyWeatherGroups[day][0].parameters[1].values[0];
            icon = dailyWeatherGroups[day][0].parameters[18].values[0];
          }
        });

        parsedWeatherData.push({
          nameOfDay: moment(day).format("dddd DD/MM"),
          dailyWeatherForecast: this.parseDailyWeather(dailyWeatherGroups[day]),
          icon,
          displayTemp,
          showForecast: false,
        });
      }
      return parsedWeatherData;
    },

    parseDailyWeather(dailyWeatherData) {
      return dailyWeatherData.map((hour) => {
        return {
          hour: moment(hour.validTime).format("LT"),
          temperature: hour.parameters[1].values[0],
          icon: hour.parameters[18].values[0],
        };
      });
    },
  },
  mounted() {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
