<script>
  import Router, { link, location } from "svelte-spa-router";
  import Main from "./pages/main.svelte";
  import "./style.css";
  
  const routes = {
    "/": Main,
  };
</script>

<Router {routes} />

<style lang="postcss">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
</style>
