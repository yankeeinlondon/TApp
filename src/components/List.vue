<!--
  Describe the List Component
-->
<script setup lang="ts">

interface Props {
  foo: string
};

const {
  foo = "bar"
} = defineProps<Props>();

</script>

<template>
<div class="list">
  {{  foo  }}
</div>
</template>

<style lang="css" scoped>

.list {
   display: grid
}

</style>
