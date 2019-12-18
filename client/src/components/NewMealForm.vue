<template lang="html">
  <div class="form">
    <form class="" v-on:submit.prevent="handleSubmit();" action="index.html" method="post">
      <input type="text" name="" value="" placeholder="Name" v-model="mealName">
      <input type="text" name="" value="" placeholder="Ingredients" v-model="ingredients">
      <input type="text" name="" value="" placeholder="Instructions" v-model="instructions">
      <input type="text" name="" value="" placeholder="URL" v-model="image">
      <input type="submit" name="" value="Accept Recipe">
    </form>
    <button type="button" name="button" v-on:click="handleCloseForm();">Cancel Form</button>
  </div>
</template>

<script>
import { eventBus } from '../main.js'
import DatabaseService from '../services/DatabaseService'

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
      this.mealObject.name = this.mealName;
      this.mealObject.ingredients = this.ingredients;
      this.mealObject.instructions = this.instructions;
      this.mealObject.image = this.image;
      eventBus.$emit('new-meal', this.mealObject)
      DatabaseService.addMeal(this.mealObject)
    },
    handleCloseForm(){
      eventBus.$emit('close-form')
    }
    }
  }

</script>

<style lang="css" scoped>
  .form {
    position: absolute;
    height: 90vh;
    width: 90vw;
    top:5%;
    left: 5%;
    background-color: white;
  }

</style>
