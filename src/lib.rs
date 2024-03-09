pub mod boid;
pub mod boids;
pub mod vec;

#[cfg(target_arch = "wasm32")]
pub mod web;

#[cfg(not(target_arch = "wasm32"))]
pub mod native;
