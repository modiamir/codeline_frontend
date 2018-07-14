<template>
  <div>
    <div class="card bg-light text-primary shadow border-0" style="width: 20rem;">
      <div class="card-body">
        <h4 class="card-title">{{weather.title}}</h4>
        <span class="d-block">{{today}}</span>
        <div style="font-size: 35px;">
          <img class="d-inline mx-1" style="width:32px" :src="todayStateIconUrl" alt="">
          <span class="d-inline mx-1">{{Math.floor(todayWeather.the_temp)}}° C</span>
        </div>
        <div class="d-block">
          <span class="d-inline ml-5 float-left">Min: {{Math.floor(todayWeather.min_temp)}}° C</span>
          <span class="d-inline mr-5 float-right">Max: {{Math.floor(todayWeather.max_temp)}}° C</span>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
    import http from '../Http';

    export default {
      name: "Weather",
      computed: {
          todayWeather: function() {
            if (this.weather && this.weather.consolidated_weather) {
              return this.weather.consolidated_weather[0];
            } else {
              return {
                air_pressure: null,
                applicable_date: null,
                created: null,
                humidity: null,
                id: null,
                max_temp: null,
                min_temp: null,
                predictability: null,
                the_temp: null,
                visibility: null,
                weather_state_abbr: null,
                weather_state_name: null,
                wind_direction: null,
                wind_direction_compass: null,
                wind_speed: null,
              };
            }
          },
          todayStateIconUrl: function () {
            return 'https://www.metaweather.com/static/img/weather/' + this.todayWeather.weather_state_abbr + '.svg';
          },
          today: function () {
            let d = new Date(this.todayWeather.applicable_date);

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
      props: {
        woeid: {
          type: Number,
          required: true,
        }
      },
      data: function() {
        return {
          weather: {}
        }
      },
      mounted() {
        http.get('/weather.php?command=location&woeid=' + this.woeid)
          .then(response => {
            console.log(response)
            this.weather = response.data;
          })
      }
    }
</script>

<style scoped>

</style>
