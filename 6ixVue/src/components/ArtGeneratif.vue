<template>
  <div class="design">
    <div class="container">
        
      <img id="disque-vinyle" src="../assets/disque-vinyle.png" />
      <canvas id="artGeneratif"></canvas>
      
    </div><div id="pane" class="pane-container"></div>
  </div>
</template>

<script>
import { Pane } from "tweakpane";

export default {
    mounted() {
        const canvas = document.getElementById("artGeneratif");
        const disqueVinyle = document.getElementById("disque-vinyle");
        const container = document.querySelector(".container");

        if (!canvas || !disqueVinyle || !container) {
            console.error("Required elements not found");
            return;
        }

        const ctx = canvas.getContext("2d");
        const width = canvas.clientWidth * 2;
        const height = canvas.clientHeight * 2;
        canvas.width = width;
        canvas.height = height;

        const params = {
            WAVE_COUNT: 50,
            LINE_WIDTH: 50,
            AMPLITUDE: 0.68,
            FREQUENCY: 3,
            BLUR: 7,
        };

        const pane = new Pane({ container: document.getElementById("pane") });
        pane.addBinding(params, "WAVE_COUNT", { min: 40, max: 60, step: 1 }).on("change", drawGrid);
        pane.addBinding(params, "LINE_WIDTH", { min: 40, max: 60, step: 1 }).on("change", drawGrid);
        pane.addBinding(params, "AMPLITUDE", { min: 0.1, max: 1, step: 0.01 }).on("change", drawGrid);
        pane.addBinding(params, "FREQUENCY", { min: 1, max: 10, step: 0.1 }).on("change", drawGrid);
        pane.addBinding(params, "BLUR", { min: 0, max: 20, step: 0.5 }).on("change", drawGrid);

        function drawBackgroundCircle() {
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2;

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();
        }

        function getRandomColor() {
            const letters = "0123456789ABCDEF";
            let color = "#";
            for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function drawWave(ctx, centerX, centerY, radius, amplitude, frequency, phase, color) {
            ctx.beginPath();
            ctx.strokeStyle = getRandomColor();
            ctx.lineWidth = params.LINE_WIDTH;

            for (let angle = 0; angle <= 360; angle += 1) {
            const radian = (Math.PI / 180) * angle;
            const distance = radius * (1 - amplitude * Math.sin(frequency * radian + phase));

            const x = centerX + Math.cos(radian) * distance;
            const y = centerY + Math.sin(radian) * distance;

            if (angle === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
            }

            ctx.closePath();
            ctx.stroke();
        }

        function drawHole() {
            const centerX = width / 2;
            const centerY = height / 2;
            const holeRadius = 30;

            ctx.beginPath();
            ctx.arc(centerX, centerY, holeRadius, 0, Math.PI * 2);
            ctx.fillStyle = "#000";
            ctx.fill();
        }

        function drawWaves() {
            const centerX = width / 2;
            const centerY = height / 2;
            const radius = Math.min(width, height) / 2;

            for (let i = 0; i < params.WAVE_COUNT; i++) {
            const phase = i * 0.1;
            drawWave(ctx, centerX, centerY, radius - i * 20, params.AMPLITUDE, params.FREQUENCY, phase);
            }
        }

        function drawGrid() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            ctx.save();
            drawBackgroundCircle();
            ctx.filter = `blur(${params.BLUR}px)`;

            drawWaves();
            drawHole();

            ctx.restore();
            ctx.filter = "none";
        }

        // Animation de rotation
        function rotateDisk() {
            let angle = 0;

            function animate() {
                angle += 0.5; // Augmentez cette valeur pour une rotation plus rapide (par exemple 0.5 ou 1)
                container.style.transform = `rotate(${angle}deg)`;
                requestAnimationFrame(animate);
            }

            animate();
        }
        drawGrid();
        rotateDisk();
    },
};

</script>

<style>
body {
  height: 100vh;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #222; /* Fond sombre pour la platine */
}
.design{
    display:flex;
    gap:'20px';
}
.container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center; /* Définit le centre de rotation */
  transition: transform 0.1s linear; /* Lissage de la rotation */
}

#disque-vinyle {
  width: 80vh; /* Taille du disque */
  height: auto;
  z-index: 0;
}

#artGeneratif {
  width: 27vh; /* Taille du canvas */
  height: 27vh;
  border-radius: 50%; /* Canvas circulaire */
  position: absolute;
  top: 50%; /* Centrer verticalement */
  left: 50%; /* Centrer horizontalement */
  transform: translate(-50%, -50%); /* Décalage pour centrer correctement */
  z-index: 1;
}

/* Style du Pane */
.pane-container {
  bottom: 10%;
  width: 60vh;
  border-radius: 10px; /* Coins arrondis */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: 'Jaini Purva';
}

.tweakpane {
  background-color: #CF0001; /* Fond sombre du pane */
  color: #fff; /* Texte blanc */
  font-family: 'Jaini Purva';
  padding:'2Opx';
}

.tweakpane .tp-button {
  background-color: #444; /* Boutons sombres */
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.tweakpane .tp-button:hover {
  background-color: #555; /* Couleur au survol */
}

.tweakpane .tp-slider {
  margin: 10px;
}

.tweakpane .tp-slider input {
  border-radius: 5px;
  background-color: #555; /* Fond des sliders */
}

.tweakpane .tp-slider .tp-value {
  color: #fff; /* Texte des valeurs des sliders */
}

</style>
