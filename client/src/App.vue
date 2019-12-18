<template>
  <div id="app">
    <h1 class="header">Seven Meals</h1>
    <draggable v-if="week" v-model="week" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="week-container">
      <p v-for="day in week.slice(0, 7)">{{day.name}}</p>
    </draggable>
    <meal-container :meals='meals'></meal-container>
    <button type="button" name="button" v-on:click="addWeekIngredients();">Save Week</button>
    <button type="button" name="button" v-on:click="handleResetWeek();">Reset Week</button>
    <button type="button" name="button"  v-on:click="createShoppingList();">Create Shopping List</button>
    <shopping-list v-if="showShoppingList" :weeksIngredients='weeksIngredients' :weeksIngredientsValue='weeksIngredientsValue'></shopping-list>
    <button type="button" name="button" v-on:click="handleShowForm();">Add New Meal</button>
    <new-meal-form v-if="showForm"></new-meal-form>
  </div>
</template>

<script>
import DatabaseService from './services/DatabaseService'
import draggable from 'vuedraggable'
import ShoppingList from './components/ShoppingList'
import MealContainer from './components/MealContainer'
import NewMealForm from './components/NewMealForm'
import {eventBus} from './main.js'

export default {
  name: 'app',
  data() {
    return {
      meals: [],
      week: [],
      weekObject: {},
      weeksIngredients: [],
      weeksIngredientsValue: [],
      inventories: [],
      showShoppingList: false,
      showForm: false
    }
  },
  components: {
    draggable,
    "shopping-list": ShoppingList,
    "meal-container": MealContainer,
    "new-meal-form": NewMealForm

  },
  mounted() {
    this.getAllMeals()
    this.getAllInventories()

    eventBus.$on('new-meal', mealObject => {
      this.meals.push(mealObject)
      this.showForm = false
      })

    eventBus.$on('close-form', () =>
      this.showForm = false
    )

    eventBus.$on('close-shopping-list', () =>
      this.showShoppingList = false
    )
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
        for (const ingredient in meal.ingredients) {
          this.weeksIngredients.push(ingredient);
          this.weeksIngredientsValue.push(meal.ingredients[ingredient]);
        }
      }
    },
    handleShowForm(){
      this.showForm = true;
    },
    createShoppingList(){
      this.showShoppingList = true
    },
    handleResetWeek(){
      this.week = [];
      this.weekObject = [];
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
  background-color: #E8E8E8;
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
