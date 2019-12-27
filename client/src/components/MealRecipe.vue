<template lang="html">
  <div class="meal-recipe" v-if="meal">
    <h2>{{meal.name}}</h2>
    <p>{{meal.ingredients}}</p>
    <!-- <p>{{meal.instructions}}</p> -->
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
    <button v-on:click="closeMeal();" type="button" name="button">Close</button>
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
    border: 2px solid black;
  }
  p{
    display: block;
  }
</style>
