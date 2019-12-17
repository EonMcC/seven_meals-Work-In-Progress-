<template>
  <div id="app">
    <h1 class="header">Seven Meals</h1>
    <draggable v-if="week" v-model="week" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="week-container">
      <p v-for="day in week.slice(0, 7)">{{day.name}}</p>
    </draggable>
    <draggable v-if="meals" v-model="meals" :group="{ name: 'choiceOfMeals', pull: 'clone', put: false}" @start="drag=true" @end="drag=false" class="meals-container">
      <p v-for="meal in meals" :key="meal.id">{{meal.name}}</p>
    </draggable>
    <button type="button" name="button" v-on:click="addWeekIngredients">Save</button>
  </div>
</template>

<script>
import DatabaseService from './services/DatabaseService'
import draggable from 'vuedraggable'

export default {
  name: 'app',
  data() {
    return {
      meals: [],
      week: [],
      weeksIngredients: [],
      inventories: []
    }
  },
  components: {
    draggable
  },
  mounted() {
    this.getAllMeals()
    this.getAllInventories()
  },
  methods: {
    getAllMeals(){
      DatabaseService.getAllMeals()
      .then(data => this.meals = data)
    },
    getAllInventories(){
      DatabaseService.getAllInventories()
      .then(data => this.inventories = data)
    },
    addWeekIngredients(){
      for (const meal of this.week) {
        console.log(meal.ingredients)
        for (const ingredient in meal.ingredients) {
          this.weeksIngredients.push({[ingredient]: meal.ingredients[ingredient]});
        }
      }
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
  margin-top: 20px;
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
