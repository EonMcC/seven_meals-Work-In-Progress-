<template>
  <div id="app">
    <h1 class="header">Seven Meals</h1>
    <draggable v-if="week" v-model="week" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="week-container">
      <div class="indv-meal-box" v-for="day in week.slice(0, 7)">
        <h3>{{day.name}}</h3>
        <img class="image" v-bind:src="day.image">
      </div>
    </draggable>
    <meal-container :meals='meals'></meal-container>
    <button type="button" name="button" v-on:click="addWeekIngredients();">Save Week</button>
    <button type="button" name="button" v-on:click="handleResetWeek();">Reset Week</button>
    <button type="button" name="button"  v-on:click="createShoppingList();">Create Shopping List</button>
    <shopping-list v-if="showShoppingList" :noDuplicateIngredients='noDuplicateIngredients'></shopping-list>
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
      noDuplicateIngredients: {},
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
      var allMealsArray = [];  //array
        //ans
      for (const meal of this.week) {
        for (const ingredient in meal.ingredients) {
          allMealsArray.push({[ingredient]: parseInt(meal.ingredients[ingredient])})
        }
      }
      for(var i = 0; i < allMealsArray.length; ++i){
        for(var ingredientObject in allMealsArray[i]){
          this.noDuplicateIngredients[ingredientObject] = this.noDuplicateIngredients[ingredientObject] ? this.noDuplicateIngredients[ingredientObject] + allMealsArray[i][ingredientObject] : allMealsArray[i][ingredientObject];
        }
      }
      console.log(this.noDuplicateIngredients)
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
  background-color: #B3D89C;
  height: 95vh;
  width: 95vw;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template: auto 1fr / 1fr 1fr;
  background-color: #E8E8E8;
}

.header {
  grid-area: 1/1/2/3;
}

.week-container {
  grid-area: 2/1/3/2;
  border: 2px solid #77A6B6;
  margin-left: 5%;
}

.meals-container {
  grid-area: 2/2/3/3;
}

.indv-meal-box {
  border: 1px solid #4D7298;
  margin: 0% auto 5% auto;
  height: 50px;
  width: 50px;
  overflow: hidden;
}

.image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  opacity: 0.7;
  display: inline;
}

h3 {
  display: inline;
  z-index: 1;
  opacity: 0.9;
  width: 33%;
}
</style>
