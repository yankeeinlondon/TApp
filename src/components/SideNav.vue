<script setup lang="ts">

  const p = defineProps<{
    items: string
  }>();

  const sections = computed(() => {
    return p.items.split(/,\s*/);
  })

  const route = useRoute();
  const active = computed(() => {
    return route.path === "/"
      ? sections.value[0]
      : sections.value[
          sections.value.findIndex(i => route.path.slice(1).toLowerCase() === i.toLowerCase())
        ]
});
</script>

<template>

<nav  :data-active-route="active"  >
  <div class="spacer"></div>
  <ul class="nav-list align-end w-full">
    <SideNavItem v-for="section in sections"
      :id="`sn-${section}`"
      :key="section"
      :active="active"
      :section="section"
    />
  </ul>
  <div class="spacer-bottom">&nbsp;</div>
</nav>

</template>

<style lang="css" scoped>

nav {
  grid-area: Left;
  display: grid;
  position: relative;
  grid-template-columns: minmax(0px, 100vw) minmax(85px, 150px);
  margin: 0;
  padding: 0;
  justify-items: end;
}

.nav-list {
  display: flex;
  /* position: fixed; */
  flex-direction: column;
  gap: 0.75rem;
  list-style: none;
  padding-top: 3rem;
}

.spacer-bottom {
  display: flex;
  flex-grow: 1;
}

</style>
