<template lang="html">
  <form class="" v-on:submit.prevent="handleSubmit();" action="index.html" method="post">
    <input type="text" name="" value="" placeholder="Name" v-model="mealName">
    <input type="text" name="" value="" placeholder="Ingredients" v-model="ingredients">
    <input type="text" name="" value="" placeholder="Instructions" v-model="instructions">
    <input type="text" name="" value="" placeholder="URL" v-model="image">
    <input type="submit" name="" value="Accept Recipe">
  </form>
</template>

<script>
import { eventBus } from '../main.js'
export default {
  name: "new-meal-form",
  data(){
    return {
      mealName: "",
      ingredients: "",
      instructions: "",
      image: "",
      mealObject: {}
    }
  },
  methods: {
    handleSubmit() {
      this.mealObject.name = this.name;
      this.mealObject.ingredients = this.ingredients;
      this.mealObject.instructions = this.instructions;
      this.mealObject.image = this.image;
      eventBus.$emit('new-meal', this.mealObject)
    }
    }
  }

</script>

<style lang="css" scoped>
</style>
