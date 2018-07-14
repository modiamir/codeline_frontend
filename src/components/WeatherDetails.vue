<template>
  <div class="py-4">
    <div class="row">
      <div class="col-6 float-left text-left">
        <h3 class="d-inline mr-1">{{weather.title}}</h3><span v-show="weather.parent">{{weather.parent.title}}</span>
      </div>
      <div class="col-6 float-left text-right" style="font-size: 12px;">
        <span class="d-block">
          <label class="m-0">Time:</label>{{getTimeFromFormatted(weather.time)}}
        </span>
        <span class="d-block">
          <label class="m-0">Sunrise:</label>{{getTimeFromFormatted(weather.sun_rise)}}
        </span>
        <span class="d-block">
          <label class="m-0">Sunset:</label>{{getTimeFromFormatted(weather.sun_set)}}
        </span>
      </div>
    </div>
    <div class="row mt-3">
      <div v-for="dayWeather in weather.consolidated_weather" class="col-2 text-center">
        <span>{{getDate(dayWeather.applicable_date)}}</span>
        <span class="d-block  my-2 mx-auto">
          <img class="d-inline" style="width:32px" :src="stateIconUrl(dayWeather.weather_state_abbr)" alt="">
          <span class="d-inline">{{dayWeather.weather_state_name}}</span>
        </span>
        <span class="my-2" style="font-size: 14px">
          <span class="d-block">Min: {{Math.floor(dayWeather.min_temp)}}° C</span>
          <span class="d-block">Max: {{Math.floor(dayWeather.max_temp)}}° C</span>
        </span>

        <span style="font-size: 14px" class="d-block my-2">Humidity: {{dayWeather.humidity}}%</span>
        <span style="font-size: 14px" class="d-block my-2">Visibility: {{Math.floor(dayWeather.visibility)}} miles</span>
        <span style="font-size: 12px" class="d-block my-2">Pressure: {{Math.floor(dayWeather.air_pressure)}} miles</span>
      </div>
    </div>
  </div>

</template>

<script>
  import http from '../Http';

  export default {
    name: "WeatherDetails",
    props: {
    },
    data: function() {
      return {
        weather: {}
      }
    },
    methods: {
      stateIconUrl: function (state_abbr) {
        return 'https://www.metaweather.com/static/img/weather/' + state_abbr + '.svg';
      },
      getTimeFromFormatted(formatted) {
        let dt = new Date(formatted);
        return dt.getHours() + ':' + dt.getMinutes();
      },

      getDate: function (date) {
        let d = new Date(date);

        let monthNames = [
          "January", "February", "March",
          "April", "May", "June", "July",
          "August", "September", "October",
          "November", "December"
        ];

        let day = d.getDate();
        let monthIndex = d.getMonth();
        let year = d.getFullYear();

        return day + ' ' + monthNames[monthIndex] + ' ' + year;

      }
    },
    mounted() {
      http.get('/weather.php?command=location&woeid=' + this.$route.params.woeid)
        .then(response => {
          console.log(response)
          this.weather = response.data;
        })
    }
  }
</script>

<style scoped>

</style>
