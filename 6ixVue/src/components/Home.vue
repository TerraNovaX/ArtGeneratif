
<script setup>
import '../assets/home.css'
import ArtGeneratif from './ArtGeneratif.vue';
// const visualizer = document.querySelector('.visualizer');
//     const audio = document.getElementById('audio');
//     const visualizerContainer = document.querySelector('.visualizer-container');
//     const barCount = 64;
//     const bars = [];
//     let audioContext, analyser, source;

//     for (let i = 0; i < barCount; i++) {
//       const bar = document.createElement('div');
//       bar.className = 'bar';
//       visualizer.appendChild(bar);
//       bars.push(bar);
//     }

//     window.addEventListener('scroll', () => {
//       const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
//       const currentScroll = window.scrollY;
      
//       if (currentScroll >= maxScroll) {
//         visualizerContainer.style.opacity = '1';
//         audio.play();
//         initAudio();
//       } else {
//         visualizerContainer.style.opacity = '0';
//         audio.pause();
//       }
//     });

//     function initAudio() {
//       if (!audioContext) {
//         audioContext = new (window.AudioContext || window.webkitAudioContext)();
//         analyser = audioContext.createAnalyser();
//         analyser.fftSize = 512;
//         source = audioContext.createMediaElementSource(audio);
//         source.connect(analyser);
//         analyser.connect(audioContext.destination);
//         animate();
//       }
//     }

//     function animate() {
//       const dataArray = new Uint8Array(analyser.frequencyBinCount);
//       analyser.getByteFrequencyData(dataArray);

//       bars.forEach((bar, index) => {
//         const value = dataArray[index];
//         const height = (value / 255) * 100;
//         bar.style.height = `${height}%`;
//       });

//       requestAnimationFrame(animate);
//     }

</script>

<template>
  <header>
    <a href="#">HOME</a>
    <a href="#">ABOUT</a>
    <a href="#">TOUR</a>
    <a href="#">ORDER</a>
  </header>

  <section class="animated-banner">
    <div class="sep"></div>
        <div class="container">
          <p class="slide-right">The</p>
          <p class="slide-left">New</p>
          <p class="slide-right">Album</p>
          <p class="slide-left">By</p>
          <p class="slide-right">6ix9ine</p>
          <span><p class="slide-left">Is Out!</p></span>
        </div>
      </section>
    

    <div class="container">
      <section class="album">
          <div class="albumBx">
              <img src="../assets/album.png" alt="Album cover">
              <img src="../assets/vinyle.png" alt="Vinyl" class="vinyl">
          </div>
          <div class="txt">
              <h3>DONNA</h3>
              <p>Après une période de silence marquée par des controverses et une absence médiatique, 6ix9ine signe son grand retour avec "DONNA", un album qui symbolise sa renaissance musicale et personnelle. Dans ce projet explosif, l'artiste new-yorkais mélange ses influences trap agressives à des sonorités plus introspectives, montrant une facette inattendue de sa personnalité.</p>
          </div>
      </section>

  </div>
    <ArtGeneratif/>
  </template>
