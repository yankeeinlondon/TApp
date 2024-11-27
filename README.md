# TAPP: Tauri + Vue + TypeScript

## Overview

This template provides an opinated template for building Tauri Desktop and Mobile applications along with a Web application to boot. It leverage a setup structure very similar to the [Vitesse](https://github.com/antfu-collective/vitesse?tab=readme-ov-file) template that is maintained by Anthony Fu for frontend. This includes features such as:

- [File based routing](https://github.com/antfu-collective/vitesse/blob/main/src/pages)
- Markdown auto-rendering
- [Component auto-importing](https://github.com/antfu-collective/vitesse/blob/main/src/components)
- [Iconify](https://icones.netlify.app/) icon auto-importing using [PureCSS](https://github.com/antfu/unocss/tree/main/packages/preset-icons)
- [VueUse](https://github.com/antfu/vueuse) composable utilities
- State management via [Pania](https://pinia.vuejs.org/)
- Routing via [Vue Router](https://github.com/vuejs/router)
- [UnoCSS](https://github.com/unocss/unocss) formatting
- [I18n ready](https://github.com/antfu-collective/vitesse/tree/main/locales)
- Webfont [self hosting](https://github.com/feat-agency/vite-plugin-webfont-dl)

### Getting Started

Running `pnpm dev` will boot up the desktop platform of your frontend while starting you backend in debug mode. You can now code frontend and backend with full auto-reload support.

At this point this is no different than the default template provided by `pnpm create tauri-app` (minus a better starting configuration for VueJS projects) but the package.json provides the following capabilities:

1. `add-ios` - adds IOS as a target platform
2. `add-android` - adds Android as a target platform
3. `add-web` - adds web as a target platform

Whereas initially we only had the desktop as a target, once we add additional platforms the `pnpm dev` command will now bring up frontend's for all target platforms. Should you only want to bring up a specific platform then you'll use the script targets `dev:desktop`, `dev:ios`, `dev:android`, or `dev:web` to isolate the platform you want to work with.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
