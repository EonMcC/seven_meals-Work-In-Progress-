<template lang="html">
  <div class="form">
    <form class="" v-on:submit.prevent="handleSubmit();" action="index.html" method="post">
      <input type="text" name="" value="" placeholder="Name" v-model="mealName">
      <div v-for="(ingredient, index) in this.ingredients">
      <input type="text" v-model="ingredient.ingredient">
      </div>
      <div v-for="(ingredient, index) in this.quantities">
      <input type="text" v-model="ingredient.quantity">
      </div>
      <h4 @click="addIngredient">
        New Ingredient
      </h4>
      <!-- <input type="text" name="" value="" placeholder="Instructions" v-model="instructions"> -->
      <input type="text" name="" value="" placeholder="URL" v-model="image">
      <input type="submit" name="" value="Accept Recipe">
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
    position: absolute;
    height: 90vh;
    width: 90vw;
    top:5%;
    left: 5%;
    background-color: white;
  }
  input{
    border: 1px solid black;
  }

</style>
