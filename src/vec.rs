#[derive(Debug, Default, Clone, Copy, PartialEq, PartialOrd)]
pub struct Vector2 {
    pub x: f32,
    pub y: f32,
}

impl Vector2 {
    pub fn add_vec(&mut self, other: Vector2) {
        self.x += other.x;
        self.y += other.y;
    }
    pub fn sub_vec(&mut self, other: Vector2) {
        self.x -= other.x;
        self.y -= other.y;
    }
    pub fn div(&mut self, scalar: f32) {
        self.x /= scalar;
        self.y /= scalar;
    }
    pub fn mul(&mut self, scalar: f32) {
        self.x *= scalar;
        self.y *= scalar;
    }
    pub fn limit(&mut self, scalar: f32) {
        if self.x >= scalar {
            self.x = scalar;
        }
        if self.y >= scalar {
            self.y = scalar;
        }
    }
    pub fn length(&self) -> f32 {
        (self.x.powf(2.0) + self.y.powf(2.0)).sqrt()
    }
    pub fn normalize(&mut self) {
        let length = self.length();
        self.x /= length;
        self.y /= length;
    }
    pub fn set_mag(&mut self, scalar: f32) {
        self.normalize();
        self.mul(scalar);
    }
    pub fn distance(&self, other: &Vector2) -> f32 {
        ((self.x - other.x).powf(2.0) + (self.y - other.y).powf(2.0)).sqrt()
    }
}
