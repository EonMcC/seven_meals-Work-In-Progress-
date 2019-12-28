<template lang="html">
  <div class="meal-recipe" v-if="meal">
    <h2>{{meal.name}}</h2>
    <img class="image" v-bind:src="meal.image">
    <p class="ingredients" v-for="(quantity, ingredient) in meal.ingredients">{{ingredient}} : {{quantity}}</p>
    <editor
    v-model="meal.instructions"
    :disabled=true
     api-key="xl05x6x6zhlkt1o2viaihcjkj8u9gm6ls0gdwlod3h7mmjcu"
     initialValue="<p>Method...</p>"
     :init="{
       height: 500,
       menubar: false,
       plugins: [
         'advlist autolink lists link image charmap print preview anchor',
         'searchreplace visualblocks code fullscreen',
         'insertdatetime media table paste code help wordcount'
       ],
       toolbar: false,
     }"
     ></editor>
    <button v-on:click="closeMeal();" type="button" name="button">Back</button>
  </div>
</template>

<script>
import {eventBus} from '../main.js'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: "meal-recipe",
  props: ['meal'],
  methods:{
    closeMeal(){
      eventBus.$emit('closeMeal')
    }
  },
  components: {
    'editor': Editor
  }
}
</script>

<style lang="css" scoped>
  .meal-recipe {
    position: absolute;
    height: 100vh;
    width: 100vw;
    left: 0;
    top: 0;
    background-color: white;
  }
  h2 {
    margin: 3%;
  }
  p {
    display: block;
  }
  .ingredients {
    text-align: left;
    margin-left: 5%;
    margin-bottom: 1%;
    font-weight: bold;
  }

  button {
    z-index: 10;
    position: relative;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.2;
  }
</style>
