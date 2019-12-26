<template>
  <div id="app">
    <h1 class="header">Seven Meals</h1>
    <div class="week-container">
      <draggable v-if="mon" v-model="mon" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Monday</p>
        <div class="indv-meal-box" v-for="meal in mon.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="tue" v-model="tue" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Tuesday</p>
        <div class="indv-meal-box" v-for="meal in tue.slice(0, 1)">

          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="wed" v-model="wed" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Wednesday</p>
        <div class="indv-meal-box" v-for="meal in wed.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="thur" v-model="thur" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Thursday</p>
        <div class="indv-meal-box" v-for="meal in thur.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="fri" v-model="fri" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Friday</p>
        <div class="indv-meal-box" v-for="meal in fri.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="sat" v-model="sat" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Saturday</p>
        <div class="indv-meal-box" v-for="meal in sat.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
      <draggable v-if="sun" v-model="sun" group="choiceOfMeals" @start="drag=true" @end="drag=false" class="day">
        <p>Sunday</p>
        <div class="indv-meal-box" v-for="meal in sun.slice(0, 1)">
          <h3>{{meal.name}}</h3>
          <!-- <img class="image" v-bind:src="meal.image"> -->
        </div>
      </draggable>
    </div>
    <meal-container :meals='meals'></meal-container>
    <button type="button" name="button" v-on:click="addToWeek(); addWeekIngredients();">Save Week</button>
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
      mon: [],
      tue: [],
      wed: [],
      thur: [],
      fri: [],
      sat: [],
      sun: [],
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
    addToWeek(){
      this.week.push(this.mon[0])
      this.week.push(this.tue[0])
      this.week.push(this.wed[0])
      this.week.push(this.thur[0])
      this.week.push(this.fri[0])
      this.week.push(this.sat[0])
      this.week.push(this.sun[0])
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
  margin-left: 5%;
  display: grid;
  grid-template-rows: repeat(7, 1fr);
  overflow: scroll;
}

.day {
  border: 1px dashed #77A6B6;
}
p {
  padding: 0px;
  display: inline;
}

.meals-container {
  grid-area: 2/2/3/3;
}

.indv-meal-box {

  margin: 0% auto 5% auto;
  height: 30px;
  width: 100%;
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
