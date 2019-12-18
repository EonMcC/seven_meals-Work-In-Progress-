<template lang="html">
  <div>
  <div class="shopping-list">
    <p v-for="meal in weekObject.week_one">{{meal.ingredients}}</p>
  </div>

  </div>
</template>

<script>
export default {
  name: "shopping-list",
  props: ['weekObject']
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
