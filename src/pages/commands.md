
<script setup lang="ts">
import { ref } from "vue";
import { invoke } from "@tauri-apps/api/core"

const greetMsg = ref("");
const name = ref("");
async function greet() {
  // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
  greetMsg.value = await invoke("greet", { name: name.value });
}
</script>
<route lang="yaml">
meta:
  layout: hero
  title: Commands
</route>

# Tauri Commands 

The concept of "commands" in Tauri is a way to easily communicate between your Tauri frontend (in JS/TS) and backend (in Rust).

The starter template that comes with Tauri demonstrates this by allowing you to send a name to the backend and have it then reply with a string greeting. You can try it below:

<form class="row" @submit.prevent="greet">
    <input id="greet-input" v-model="name" placeholder="Enter a name..." ring-purple-500 focus:ring-1 dark:ring-purple-700 bg-gray-50 dark:bg-gray-800 />
    <button type="submit" >Greet</button>
</form>
<p v-if="greetMsg">{{ greetMsg }}</p>
<p v-else>&nbsp;</p>

## Additional Commands

This starter template adds several more commands. If you don't want to use any of them simply remove them from the <pop id="removal" monospaced text="This is where all command are implemented">src-tauri/src/lib.rs</pop> file.



