<script>
  import Screenshot from "$lib/assets/screenshot.svg";
  import Animate from "./Animate.svelte";

  const features = [
    {
      icon: "🔆",
      title: "Brightness fine-tuning",
      description: "Whether setting the relative brightness of all displays, or adjusting the brightness of a specific one, we've got you covered."
    },
    {
      icon: "🖥️",
      title: "Excellent monitor support",
      description:
        "Tweak brightness levels for all kinds of displays."
    },
    {
      icon: "🕑",
      title: "Convenient scheduling",
      description: "Effortlessly modify display brightness based on the time of day."
    }
  ];
</script>

<div class="bg-teal-950 text-white relative overflow-hidden">
  <div class="container mx-auto space-y-12 py-24">
    <div class="relative z-10 py-24">
      <Animate>
        <div class="text-6xl font-display font-bold max-w-2xl mx-auto text-center px-8">
          <span class="text-teal-300">Glimmr</span> gives you
          <span class="text-yellow-500">full control</span>
          over the <span class="text-yellow-500">brightness</span> of your monitors.
        </div>
      </Animate>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 items-center z-10 relative">
      <div>
        <Animate>
          <img src={Screenshot} />
        </Animate>
      </div>
      <div class="flex flex-col space-y-4 p-6">
        {#each features as feature, i}
          <Animate>
            <div
              class="p-6 bg-teal-900 bg-opacity-80 backdrop-blur-2xl text-white drop-shadow-lg rounded-xl space-y-4"
            >
              <div class="text-yellow-500 drop-shadow-2xl text-4xl p-3 rounded-lg bg-teal-950 inline-block"
              >{feature.icon}</div
              >
              <div class="text-3xl font-display font-bold capitalize">{feature.title}</div>
              <div class="text-2xl opacity-70">{feature.description}</div>
            </div>
          </Animate>
        {/each}
      </div>
    </div>
    <div class="bg-amber-500 w-[48rem] h-[48rem] rounded-full absolute -right-40 -bottom-1/4 z-0"></div>
    <div class="bg-teal-900 w-[56rem] h-[56rem] rounded-full absolute -left-40 -top-1/4 lg:-top-1/3 z-0"></div>
  </div>
</div>
