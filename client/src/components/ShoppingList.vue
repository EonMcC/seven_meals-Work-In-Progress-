<template lang="html">
  <div class="shopping-list">
    <div>
      <p v-for="ingredient of weeksIngredients">{{ingredient}}</p>
      <p v-for="ingredientValue of weeksIngredientsValue">{{ingredientValue}}</p>
    </div>
    <button type="button" name="button" v-on:click="handleCloseShoppingList();">Close Shopping List</button>

  </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: "shopping-list",
  props: ['weeksIngredients', 'weeksIngredientsValue'],
  methods: {
    handleCloseShoppingList(){
      eventBus.$emit('close-shopping-list')
    }
  }
}

</script>

<style lang="css" scoped>
  .shopping-list {
    position: absolute;
    height: 90vh;
    width: 90vw;
    top: 0;
    left: 0;
    background-color: lightgrey;
    opacity: 0.9;
  }
</style>
