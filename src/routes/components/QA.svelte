<script>
  import collapse from "svelte-collapse";

  export let question = "";
  export let answer = "";

  let open = false;

</script>

<section class="shadow-2xl  p-6 rounded-lg cursor-pointer transition {open ? 'bg-gray-950 text-white' : 'bg-white text-black hover:bg-teal-500 hover:text-white'}" on:click={() => open = !open}>
  <div class="flex items-center justify-between text-left">
    <h1 class="font-medium transition max-w-2xl font-display text-xl">{question}</h1>
    <span class="material-symbols-outlined">{open ? "expand_less" : "expand_more"}</span>
  </div>
  <div use:collapse={{open}}>
    <p class="text-left pt-4 pb-2 text-xl leading-8 opacity-90">{answer}</p>
  </div>
</section>