---
title: Routing
prev: "Home"
next: "Layouts for All"
---
<route lang="yaml">
meta:
  layout: hero
  title: Routing
</route>

## Overview

_draw_ **picture**

## Technical Building Blocks


- [Vue Router](https://router.vuejs.org/)

    The mastermind behind the routing of your application is done via the battle tested **Vue Router**. But because the Vue Router is fully _configuration based_ and you're never fully satified (are you?) we've added a few more layers to make you're life better.

- [unplugin-vue-router](https://uvr.esm.is/) ([repo](https://github.com/posva/unplugin-vue-router))

    A _build-time_ plugin which simplifies the routing of your application. You can see how your application is configured with this utility in the `vite.config.ts` fle of your repo.

    Ultimately, the job of the **unplugin-vue-router** is to work with [Vite](https://vite.dev/guide/) at both build time and during "dev" mode to produce a router configuration for you based on a file-based routing scheme. It also produces the handy `RouterLink` component:

    1. In you're `main.ts` file you'll find

       ```ts
       import { routes } from 'vue-router/auto-routes'
       ```

       This artifact will be passed to **vite-plugin-vue-layouts** (discussed below).

    2. Anywhere in your _pages_ be that via a VueJS file or a Markdown file (both are options), you can then link to other routes with:
    
        ```markdown
        # My Beatiful Page

        ## Now Get Out

        <router-link to="/jail">leave immediately</router-link>
        ```

       Note that whether in a VueJS template or a Markdown file, you may use `<router-link>` _without_ the need to import explicitly. This is due to the magic of [unplugin-auto-import](https://github.com/unplugin/unplugin-auto-import).

- [vite-plugin-vue-layouts](https://github.com/JohnCampionJr/vite-plugin-vue-layouts)

    The final piece of the puzzle is **vite-plugin-vue-layouts** which performs a handy little trick ... it wraps all of your "pages" (found in the `/pages` folder) into a "layout" where a layout is nothing more than a VueJS SFC file in the `/layouts` folder. 



