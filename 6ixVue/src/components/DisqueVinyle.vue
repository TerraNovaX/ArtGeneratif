<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ArtGeneratif from './ArtGeneratif.vue';

const vinyle = ref(null);
const audio = ref(null);
const visualizerContainer = ref(null);
const visualizer = ref(null);

const barCount = 64;
const bars = [];
let audioContext, analyser, source;

// Paramètres du vinyle
const minSize = 150;
const maxSize = 700;
const maxScroll = window.innerHeight;

const showArtGeneratif = ref(false); // Contrôle la visibilité du composant ArtGeneratif

function initAudio() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.AudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 512;
    source = audioContext.createMediaElementSource(audio.value);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    animate();
  }
}

function animate() {
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(dataArray);

  bars.forEach((bar, index) => {
    const value = dataArray[index];
    const height = (value / 255) * 100;
    bar.style.height = `${height}%`;
  });

  requestAnimationFrame(animate);
}

onMounted(() => {
  // Création des barres
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'bar';
    visualizer.value.appendChild(bar);
    bars.push(bar);
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const newSize = Math.min(maxSize, Math.max(minSize, 150 + scrollY * 0.8));
    const newLeft = Math.max(22, 50 - (scrollY / maxScroll) * 45);

    vinyle.value.style.width = `${newSize}px`;
    vinyle.value.style.left = `${newLeft}%`;

    if (scrollY >= maxScroll) {
      vinyle.value.classList.add('rotate');
      visualizerContainer.value.style.opacity = '1';
      audio.value.play();
      initAudio();

      showArtGeneratif.value = true; // Affiche le composant ArtGeneratif
    } else {
      vinyle.value.classList.remove('rotate');
      visualizerContainer.value.style.opacity = '0';
      audio.value.pause();

      showArtGeneratif.value = false; // Masque le composant ArtGeneratif
    }
  });
});
</script>


<template>
    <div id="art-vinyle-container">
      <img ref="vinyle" src="../assets/disque-vinyle.png" alt="Disque Vinyle" id="art-vinyle" />
      <audio ref="audio" src="gummo.mp3" loop></audio>
      <div ref="visualizerContainer" id="art-visualizer-container">
        <div ref="visualizer" id="art-visualizer"></div>
      </div>
      <ArtGeneratif v-if="showArtGeneratif" /> <!-- Composant affiché conditionnellement -->
    </div>
  </template>
  

<style>
/* Limitation des styles au conteneur principal */
/* #art-vinyle-container {
  margin: 0;
  padding: 0;
  height: 200vh;
  background-color: #f0f0f0;
  
} */

#art-vinyle {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: auto;
  transition: transform 0.1s linear;
}

#art-vinyle.rotate {
  animation: art-spin 2s linear infinite;
}

@keyframes art-spin {
  from {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

#art-visualizer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25vh;
  display: flex;
  justify-content: center;
  filter: blur(15px);
  transform: scale(1.2);
  opacity: 0;
  transition: opacity 0.5s;
}

#art-visualizer {
  display: flex;
  align-items: flex-end;
  gap: 4px;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}

#art-visualizer .bar {
  flex: 1;
  background: linear-gradient(to top, #00ff00, #00ffff);
  border-radius: 10px;
  transition: height 0.05s ease;
  min-width: 20px;
}
</style>
