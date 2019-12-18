<template lang="html">
  <div class="">

  <draggable v-if="meals" v-model="meals" :group="{ name: 'choiceOfMeals', pull: 'clone', put: false}" @start="drag=true" @end="drag=false" class="meals-container">
    <p v-for="meal in meals" :key="meal.id" v-on:click='selectedMeal(meal)'>{{meal.name}}</p>
  </draggable>
  <meal-recipe :meal='meal'></meal-recipe>
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
</style>
