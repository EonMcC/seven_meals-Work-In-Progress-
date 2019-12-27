<template lang="html">
  <div class="shopping-list">
      <h2>Shopping List</h2>
      <p class="ingredients" v-for="(quantity, ingredient) in noDuplicateIngredients">{{ingredient}} : {{quantity}}</p>
    <button type="button" name="button" v-on:click="handleCloseShoppingList();">Close Shopping List</button>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
export default {
  name: "shopping-list",
  props: ['noDuplicateIngredients'],
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
    height: 100vh;
    width: 100vw;
    background-color: white;
  }
  .ingredients {
    margin-top: 2%;
    display: block;
  }
  h2 {
    margin: 5% 0%;
  }
  button {
    margin-top: 5%;
  }
</style>
