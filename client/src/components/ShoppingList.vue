<template lang="html">
  <div class="shopping-list">
    <div>
      <p v-for="(value, ingredient) of noDuplicateIngredients">{{ingredient}} : {{value}}</p>
    </div>
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
    height: 90vh;
    width: 90vw;
    top: 5%;
    left: 5%;
    background-color: white;
  }
</style>
