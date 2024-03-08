use wasm_bindgen::prelude::*;

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn rand_range(start: f32, end: f32) -> f32;
}
