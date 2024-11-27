<script setup lang="ts">
  const p = defineProps({
    section: {type: String},
    active: {type: String},
  });

  const state = computed(() => p.active === p.section ? "active" : "inactive")
  const router = useRouter();
  const go = () => {
    let target = router.getRoutes().find(r => r.path.toLowerCase() === `/${p.section?.toLowerCase()}`);
    if (target) {
      router.push(target.path);
    } else {
      router.push("/")
    }
  }
</script>


<template>

<li
    :class="state"
    class="nav-item" py-4 px-3 cursor-pointer select-none rounded-l-4 overflow-hidden
    @click="go"
>
  {{ section }}
</li>

</template>

<style lang="css" scoped>


.nav-item {
  background-color: var(--nav-bg-color);
  border-right-width: var(--side-border-width);
  border-right-color: var(--side-border-color);
  border-right-style: solid;
  margin-right: -4px;
}
.nav-item:hover {
  background-color: var(--nav-bg-hover)
}
.nav-item.active {
  background-color: var(--nav-bg-color-active);
  border-right-color: var(--nav-border-color-active);
}
</style>
