<script lang="ts">
  
  import { Router, Link, Route } from "svelte-routing";
  import { tooltip } from 'svooltip';
  import 'svooltip/styles.css';
  import Example1 from './components/VirtualList/Example1.svelte'
  import Example2 from './components/VirtualList/Example2.scrollToIndex.svelte'
  import Artist from "./screens/Artist/Artist.svelte"
  import Explore from "./screens/Explore/Explore.svelte"
  
  let audio: HTMLAudioElement;

  function initPlay() {
    audio.src = "file://C:/Users/DELL/Music/Sara-Kays-Miss-Me-The-Same-(Gospeljingle.com).mp3"
    audio.play()
  }


</script>

<div>
  <button on:click={initPlay}>Load audio</button>

  <audio bind:this={audio}>
    <track kind="captions" />
  </audio>



  <br /><br /><br />





  <div class="p-10">
    <div class="group relative w-max">
      <button>Click me!</button>
      <span
        class="pointer-events-none absolute -top-7 left-0 w-max opacity-0 transition-opacity group-hover:opacity-100"
      >
        This is a button.
      </span>
    </div>
  </div>

  <button class="btn variant-filled" >Click</button>

  <div class="card p-4 variant-filled-primary" data-popup="popupClick">
    <p>Click Content</p>
    <div class="arrow variant-filled-primary" />
  </div>

  <button
	class="btn"
	use:tooltip={{
		content: "You're looking beautiful today!",
		placement: 'top-start',
		delay: [-1000, 0],
		offset: 0,
		// target: '#layers'
    
	}}
  
>
	Hover me for 1 second
</button>

<Router>
  <nav>
    <Link to="/">Explore</Link>
    <Link to="/artist">Artist</Link>
  </nav>
  <div>
    <!-- <Route path="/artist/:id" component={BlogPost} /> -->
    <Route path="/artist" component={Artist} />
    <Route path="/"><Explore /></Route>
  </div>
</Router>
  

  <Example1 />
  <Example2 />
  
</div>




<style>
  
</style>
