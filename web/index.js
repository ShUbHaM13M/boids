"use strict";

import init, { Boids } from "./boidlib.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

const MAX_FORCE = 0.2;
const MAX_SPEED = 6.0;
const BACKGROUND = "#121212";
const avoid_factor = 0.05;
const centering_factor = 0.0005;
const matching_factor = 0.05;

let prevTimeStamp;
let wasm;
let boids;

async function run() {
  wasm = await init();
  boids = new Boids(100);

  boids.max_force = MAX_FORCE;
  boids.max_speed = MAX_SPEED;
  boids.avoid_factor = avoid_factor;
  boids.centering_factor = centering_factor;
  boids.matching_factor = matching_factor;
  boids.randomize(canvasWidth, canvasHeight);

  window.requestAnimationFrame(render_loop);
}

function render_loop(timestamp) {
  if (prevTimeStamp !== null) {
    ctx.fillStyle = BACKGROUND;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    render_boids();
    boids.flock();
    boids.update();
    boids.check_edges(canvasWidth, canvasHeight);
  }
  prevTimeStamp = timestamp;
  window.requestAnimationFrame(render_loop);
}

function render_boids() {
  const children = boids.get_children();
  children.forEach((child) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.beginPath();
    ctx.arc(child.position.x, child.position.y, 4.0, 0, 2 * Math.PI, false);
    ctx.fill();
  });
}

run();
