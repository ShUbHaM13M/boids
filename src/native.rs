use macroquad::rand;

pub fn rand_range(start: f32, end: f32) -> f32 {
    rand::gen_range(start, end)
}
