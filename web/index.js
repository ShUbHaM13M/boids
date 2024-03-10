"use strict";

import init, { Boids } from "./boidlib.js";

const controls = document.querySelector(".controls");
if (!controls) throw Error("Controls not found");

const canvas = document.querySelector("canvas");
if (!canvas) throw Error("Canvas not found");

const ctx = canvas.getContext("2d");
let controlsShown = false;

const MAX_FORCE = 0.2;
const MAX_SPEED = 6.0;
let bgColor = "#121212";
let boidColor = "#ffffff";
let avoidFactor = 0.05;
let centeringFactor = 0.0005;
let matchingFactor = 0.05;

let prevTimeStamp;
let wasm;
let boids;

const bgColorPicker = document.querySelector("#bgColor");
function changeBgColor(color) {
  bgColor = color;
  bgColorPicker.setAttribute("value", color);
}
bgColorPicker.addEventListener("change", (e) => {
  changeBgColor(e.target.value);
});

const boidColorPicker = document.querySelector("#boidColor");
function changeBoidColor(color) {
  boidColor = color;
  boidColorPicker.setAttribute("value", color);
}
boidColorPicker.addEventListener("change", (e) => {
  changeBoidColor(e.target.value);
});

const avoidFactorSlider = document.querySelector("#avoidFactor");
function changeAvoidFactor(value) {
  avoidFactor = parseFloat(value);
  avoidFactorSlider.setAttribute("value", value);
}
avoidFactorSlider.addEventListener("change", (e) => {
  changeAvoidFactor(e.target.value);
});

const centeringFactorSlider = document.querySelector("#centeringFactor");
function changeCenteringFactor(value) {
  centeringFactor = parseFloat(value);
  centeringFactorSlider.setAttribute("value", value);
}
centeringFactorSlider.addEventListener("change", (e) => {
  changeCenteringFactor(e.target.value);
});

const matchingFactorSlider = document.querySelector("#matchingFactor");
function changeMatchingFactor(value) {
  matchingFactor = parseFloat(value);
  matchingFactorSlider.setAttribute("value", value);
}
matchingFactorSlider.addEventListener("change", (e) => {
  changeMatchingFactor(e.target.value);
});

const shareButton = document.querySelector("#share");
async function onShareClick() {
  const url = `${
    location.href.split("?")[0]
  }?show-controls=true&bg-color=${bgColor}&boid-color=${boidColor}&avoid-factor=${avoidFactor}&centering-factor=${centeringFactor}&matching=factor=${matchingFactor}`;

  const shareableData = {
    title: "Boids",
    text: "Checkout this cool boid simulation",
    url,
  };

  try {
    canShare = navigator.canShare(shareableData);
    if (canShare) {
      await navigator.share(shareData);
      return;
    }
  } catch (err) {
    try {
      await navigator.clipboard.writeText(url);
      shareButton.textContent = "Copied to clipboard!";
      setTimeout(() => {
        shareButton.textContent = "Share";
      }, 3000);
    } catch {
      console.error("Failed to copy: ", err);
    }
  }
}
shareButton.addEventListener("click", onShareClick);

const observer = new ResizeObserver((_entries) => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

async function run() {
  parseQueryParams();
  if (controlsShown) {
    canvas.width = canvas.clientWidth;
    canvas.height = 300;
  } else {
    observer.observe(canvas);
  }
  wasm = await init();
  boids = new Boids(100);

  boids.max_force = MAX_FORCE;
  boids.max_speed = MAX_SPEED;
  boids.avoid_factor = avoidFactor;
  boids.centering_factor = centeringFactor;
  boids.matching_factor = matchingFactor;
  boids.randomize(canvas.width, canvas.height);

  window.requestAnimationFrame(renderLoop);
}

function renderLoop(timestamp) {
  if (prevTimeStamp !== null) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderBoids();
    boids.flock();
    boids.update();
    boids.check_edges(canvas.width, canvas.height);

    boids.avoid_factor = avoidFactor;
    boids.centering_factor = centeringFactor;
    boids.matching_factor = matchingFactor;
  }
  prevTimeStamp = timestamp;
  window.requestAnimationFrame(renderLoop);
}

function renderBoids() {
  const children = boids.get_children();
  children.forEach((child) => {
    ctx.fillStyle = boidColor;
    ctx.beginPath();
    ctx.arc(child.position.x, child.position.y, 4.0, 0, 2 * Math.PI, false);
    ctx.fill();
  });
}

function toggleControls(value) {
  if (value === "true") {
    controlsShown = true;
    document.body.classList.add("show-controls");
    return;
  }
  controlsShown = true;
  document.body.classList.remove("show-controls");
}

const queryParamFunctionMap = {
  "show-controls": toggleControls,
  "bg-color": changeBgColor,
  "boid-color": changeBoidColor,
  "avoid-factor": changeAvoidFactor,
  "centering-factor": changeCenteringFactor,
  "matching-factor": changeMatchingFactor,
};

function parseQueryParams() {
  const path = location.href;
  let parts = path.split("?");
  if (parts.length > 1) {
    parts.splice(0, 1);
    parts = parts[0].split("&");
    parts.forEach((part) => {
      const pair = part.split("=");
      if (pair.length > 1) {
        const callback = queryParamFunctionMap[pair[0]];
        if (!callback) return;
        callback(pair[1]);
      }
    });
  }
}

run();
