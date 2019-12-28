<template lang="html">
  <div class="form">
    <h2>Add a New Recipe</h2>
    <form class="" v-on:submit.prevent="handleSubmit();">
      <label for="name">Name: </label>
      <input type="text" name="name" value="" placeholder="Enter meal name" v-model="mealName">
      <div class="container">
        <div class="ingredient" v-for="(ingredient, index) in this.ingredients">
          <input type="text" placeholder="Ingredient" v-model="ingredient.ingredient">
        </div>
          <div class="quantity" v-for="(ingredient, index) in this.quantities">
          <input type="text" placeholder="Quantity" v-model="ingredient.quantity">
        </div>
      </div>
      <h4 @click="addIngredient">
        + New Ingredient
      </h4>
      <label for="image">Image URL: </label>
      <input type="text" name="image" value="" placeholder="Optional image URL" v-model="image">
      <editor
      v-model="instructions"
       api-key="xl05x6x6zhlkt1o2viaihcjkj8u9gm6ls0gdwlod3h7mmjcu"
       initialValue="<p>Add method here...</p>"
       :init="{
         height: 400,
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
       <input class="accept-button" type="submit" name="" value="Accept Recipe">

    </form>
    <h5 v-on:click="handleCloseForm();">Cancel Form</h5>
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
      mealObjectArray: [],
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
          this.mealObjectArray.push({[this.ingredients[i].ingredient]: parseInt(this.quantities[i].quantity)})
        }
        this.mealObject.ingredients = Object.assign({}, ...this.mealObjectArray);
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
    margin-left: 5%;
    margin-bottom: 3%;
    color: green;
  }
  input{
    margin-left: 1%;
    margin-bottom: 3%;
    background-color: #EBF5EE;
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
  h5 {
    margin: auto;
    font-size: 1.1rem;
    text-align: center;
  }
  .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-flow: column;
    /* grid-template-rows: repeat(20, 1fr;) */
  }
  .ingredient {
    grid-column: 1/2;
  }
  .quantity {
    grid-column: 2/3;

    /* grid-area: 1/2/1/3 */
  }

</style>
