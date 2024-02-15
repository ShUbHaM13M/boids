use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen]
    fn platform_log(message: &str);
}

#[cfg(not(target_arch = "wasm32"))]
fn platform_log(message: &str) {
    println!("{}", message);
}

#[wasm_bindgen]
pub fn fibonacci(end: u32) {
    let mut a: u32 = 0;
    let mut b = 1;
    let mut c;
    for _ in 2..end {
        c = a + b;
        a = b;
        b = c;
        platform_log(&format!("{}", c));
    }
}
