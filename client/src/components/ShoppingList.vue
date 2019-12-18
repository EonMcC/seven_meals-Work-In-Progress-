<template lang="html">
  <div class="">
  <div v-for="meal in weekObject.week_one">
    <p>{{meal.ingredients}}</p>

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
</style>
