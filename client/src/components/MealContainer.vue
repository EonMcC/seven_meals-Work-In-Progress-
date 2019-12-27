<template lang="html">
  <div class="">
    <draggable v-if="meals" v-model="meals" :group="{ name: 'choiceOfMeals', pull: 'clone', put: false}" @start="drag=true" @end="drag=false" class="meals-container">
      <div class="indv-meal-box" v-for="meal in meals" :key="meal.id" v-on:click='selectedMeal(meal)'>
        <h3>{{meal.name}}</h3>
        <img class="image" v-bind:src="meal.image">
      </div>
    </draggable>
    <meal-recipe v-if="meal" :meal="meal"></meal-recipe>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import MealRecipe from './MealRecipe'
import {eventBus} from '../main.js'

export default {
  name: "meal-container",
  props: ['meals'],
  data() {
    return {
      meal: null
    }
  },
  mounted() {
    eventBus.$on('closeMeal',() => {
      this.meal = null

    });
  },
  components: {
    draggable,
    "meal-recipe": MealRecipe
  },
  methods:{
    selectedMeal(meal){
      this.meal = meal
    }
  }
}
</script>

<style lang="css" scoped>
  .meals-container {
    height: 515px;
    overflow: scroll;
    justify-content: center;
  }
  .indv-meal-box {
    border: 1px solid #4D7298;
    margin: 0% auto 5% auto;
    height: 125px;
    width: 125px;
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
