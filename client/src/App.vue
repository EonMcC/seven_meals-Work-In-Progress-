<template>
  <div id="app">
    <h1 class="header">Seven Meals</h1>
    <div class="week-container">
      <p v-for="day in weeks[0].days">{{day.name}}</p>
    </div>
    <div class="meals-container">
      <p v-for="meal in meals">{{meal.name}}</p>
    </div>
  </div>
</template>

<script>
import DatabaseService from './services/DatabaseService'

export default {
  name: 'app',
  data() {
    return {
      meals: [],
      weeks: [],
      inventories: []
    }
  },
  components: {

  },
  mounted() {
    this.getAllMeals()
    this.getAllWeeks()
    this.getAllInventories()
  },
  methods: {
    getAllMeals(){
      DatabaseService.getAllMeals()
      .then(data => this.meals = data)
    },
    getAllWeeks(){
      DatabaseService.getAllWeeks()
      .then(data => this.weeks = data)
    },
    getAllInventories(){
      DatabaseService.getAllInventories()
      .then(data => this.inventories = data)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: grid;
  grid-template: auto 1fr / 1fr 2fr;
}

.header {
  grid-area: 1/1/2/3;
}

.week-container {
  grid-area: 2/1/3/2;
}

.meals-container {
  grid-area: 2/2/3/3;
  display: flex;
  flex-direction: column;
}
</style>
