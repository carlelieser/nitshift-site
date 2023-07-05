<script>
  import Render from "$lib/assets/bg.jpg";
  import DownloadButton from "./DownloadButton.svelte";
  import Animate from "./Animate.svelte";
</script>

<div class="w-full pb-15 pt-44 md:pb-28 md:pt-44 bg-indigo-950 text-white overflow-hidden z-0 bg-center bg-no-repeat bg-cover" style="background-image: url('{Render}');">
  <div class="container max-w-5xl px-5 md:px-12 mx-auto relative pb-20">
    <div class="text-center">
      <div class="space-y-12">
        <div class="space-y-8 text-shadow-2xl shadow-amber-100/20">
          <Animate>
            <div class="text-6xl md:text-8xl text-transparent font-display font-bold flex md:block justify-center">
              <span class="bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 text-shadow-xl shadow-indigo-500/40">
                Simplified Brightness Control
              </span>
            </div>
          </Animate>
          <Animate delay="0.1s">
            <div class="text-2xl md:text-5xl font-display text-white opacity-80">
              Never fiddle with your monitors ever again.
            </div>
          </Animate>
        </div>
        <Animate delay="0.2s">
          <DownloadButton primary={false} showFileSize={true} size={2} />
        </Animate>
      </div>
      <div>
      </div>
    </div>
  </div>
</div>
