use crate::boid::Boid;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::wasm_bindgen;

#[cfg(target_arch = "wasm32")]
use crate::web::rand_range;

#[cfg(not(target_arch = "wasm32"))]
use crate::native::rand_range;

#[wasm_bindgen]
#[derive(Default, Debug, Serialize, Deserialize)]
pub struct Boids {
    children: Vec<Boid>,
    pub avoid_factor: f32,
    pub matching_factor: f32,
    pub centering_factor: f32,
    pub max_force: f32,
    pub max_speed: f32,
}

#[wasm_bindgen]
impl Boids {
    #[wasm_bindgen(constructor)]
    pub fn new(count: usize) -> Self {
        Self {
            children: vec![Boid::default(); count],
            ..Default::default()
        }
    }

    pub fn get_children(&self) -> Vec<Boid> {
        self.children.clone()
    }

    pub fn randomize(&mut self, screen_width: f32, screen_height: f32) {
        for child in &mut self.children {
            child.set_position(
                rand_range(0.0, screen_width),
                rand_range(0.0, screen_height),
            );
            child.set_velocity(rand_range(0.1, 1.0), rand_range(0.1, 1.0));
            child.velocity.mul(rand_range(2.0, 4.0));
            child.visual_range = 40.0;
            child.protected_range = 8.0;
            child.turn_factor = 0.2;
            child.max_speed = self.max_speed;
            child.max_force = self.max_force;
        }
    }

    pub fn check_edges(&mut self, width: f32, height: f32) {
        for child in &mut self.children {
            if child.position.x < 100.0 {
                child.velocity.x += child.turn_factor;
            } else if child.position.x > width - 100.0 {
                child.velocity.x -= child.turn_factor;
            }
            if child.position.y < 100.0 {
                child.velocity.y += child.turn_factor;
            } else if child.position.y > height - 100.0 {
                child.velocity.y -= child.turn_factor;
            }
        }
    }

    pub fn flock(&mut self) {
        for index in 0..self.children.len() {
            let boids = self.children.clone();

            let mut align = self.children[index].alignment(&boids);
            let mut separate = self.children[index].separation(&boids);
            let mut cohesion = self.children[index].cohesion(&boids);

            align.mul(self.matching_factor);
            separate.mul(self.avoid_factor);
            cohesion.mul(self.centering_factor);

            self.children[index].acceleration.add_vec(align);
            self.children[index].acceleration.add_vec(cohesion);
            self.children[index].acceleration.add_vec(separate);
        }
    }

    pub fn update(&mut self) {
        for child in &mut self.children {
            child.position.add_vec(child.velocity);
            child.velocity.add_vec(child.acceleration);
            child.velocity.limit(child.max_speed);
            child.acceleration.mul(0.0);
        }
    }
}
