<template lang="html">
  <div class="meal-recipe" v-if="meal">
    <p>{{meal.name}}</p>
    <p>{{meal.ingredients}}</p>
    <p>{{meal.instructions}}</p>
    <button v-on:click="closeMeal();" type="button" name="button">Close</button>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: "meal-recipe",
  props: ['meal'],
  methods:{
    closeMeal(){
      eventBus.$emit('closeMeal')
    }
  }
}
</script>

<style lang="css" scoped>
  .meal-recipe {
    position: absolute;
    height: 90vh;
    width: 90vw;
    top:5%;
    left: 5%;
    background-color: white;
  }
</style>
