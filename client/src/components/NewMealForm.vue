<template lang="html">
  <div class="form">
    <h2>Add a New Recipe</h2>
    <form class="" v-on:submit.prevent="handleSubmit();" action="index.html" method="post">
      <label for="name">Name: </label>
      <input type="text" name="name" value="" placeholder="Enter meal name" v-model="mealName">
      <div v-for="(ingredient, index) in this.ingredients">
      <label for="ingredient">Ingredient Name: </label>
      <input type="text" name="ingredient" v-model="ingredient.ingredient">
      </div>
      <div v-for="(ingredient, index) in this.quantities">
      <label for="ingredientQ">Quantity: </label>
      <input type="text" name="ingredientQ" v-model="ingredient.quantity">
      </div>
      <h4 @click="addIngredient">
        + New Ingredient
      </h4>
      <!-- <input type="text" name="" value="" placeholder="Instructions" v-model="instructions"> -->
      <label for="image">Image URL: </label>
      <input type="text" name="image" value="" placeholder="Optional image URL" v-model="image">
      <input class="accept-button" type="submit" name="" value="Accept Recipe">
    </form>
    <button type="button" name="button" v-on:click="handleCloseForm();">Cancel Form</button>
    <form method="post">
      <editor
      v-model="instructions"
       api-key="xl05x6x6zhlkt1o2viaihcjkj8u9gm6ls0gdwlod3h7mmjcu"
       initialValue="<p>Add instructions here</p>"
       :init="{
         height: 500,
         menubar: false,
         plugins: [
           'advlist autolink lists link image charmap print preview anchor',
           'searchreplace visualblocks code fullscreen',
           'insertdatetime media table paste code help wordcount'
         ],
         toolbar:
           'undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help'
       }"
       ></editor>
</form>
  </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import { eventBus } from '../main.js'
import DatabaseService from '../services/DatabaseService'

export default {
  name: "new-meal-form",
  data(){
    return {
      mealName: "",
      ingredients: [],
      quantities: [],
      instructions: "",
      image: "",
      mealObject: {}
    }
  },
  components: {
    'editor': Editor
  },
  methods: {
    handleSubmit() {
      this.mealObject.name = this.mealName;
      this.combineIngredientQuantity();
      this.mealObject.instructions = this.instructions;
      this.mealObject.image = this.image;
      eventBus.$emit('new-meal', this.mealObject)
      DatabaseService.addMeal(this.mealObject)
    },
    handleCloseForm(){
      eventBus.$emit('close-form')
    },
    addIngredient() {
      this.ingredients.push({ ingredient: '' });
      this.quantities.push({ quantity: '' });
    },
    combineIngredientQuantity(){
      for(var i = 0; i < this.ingredients.length; ++i){
        for(var ingredient in this.ingredients){
          this.mealObject.ingredients = {[this.ingredients[i].ingredient]: parseInt(this.quantities[i].quantity)}
          }
        }
      }
  }
}

</script>

<style lang="css" scoped>
  .form {
    text-align: left;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: white;
  }
  h2 {
    text-align: center;
    margin: 4% 0;
  }
  h4 {
    margin-bottom: 3%;
    color: green;
    text-align: center;
  }
  input{
    border: 1px solid black;
    margin-left: 1%;
    margin-bottom: 3%;
  }
  label {
    margin-left: 5%;
  }
  .accept-button {
    display: block;
    margin: auto;
    background: none;
    padding: 1%;
  }

</style>
