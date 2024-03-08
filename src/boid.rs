use crate::vec::Vector2;

#[derive(Debug, Default, Clone, Copy, PartialEq, PartialOrd)]
pub struct Boid {
    pub position: Vector2,
    pub velocity: Vector2,
    pub acceleration: Vector2,
    pub visual_range: f32,
    pub protected_range: f32,
    pub max_speed: f32,
    pub max_force: f32,
    pub turn_factor: f32,
}

impl Boid {
    pub fn set_position(&mut self, x: f32, y: f32) {
        self.position.x = x;
        self.position.y = y;
    }

    pub fn set_velocity(&mut self, x: f32, y: f32) {
        self.velocity.x = x;
        self.velocity.y = y;
    }

    pub fn set_acceleration(&mut self, x: f32, y: f32) {
        self.acceleration.x = x;
        self.acceleration.y = y;
    }

    pub fn update(&mut self) {
        self.position.add_vec(self.velocity);
        self.velocity.add_vec(self.acceleration);
        self.velocity.limit(self.max_speed);
        self.acceleration.mul(0.0);
    }

    pub fn check_edges(&mut self, width: f32, height: f32) {
        if self.position.x > width {
            self.position.x = 0.0;
        } else if self.position.x < 0.0 {
            self.position.x = width;
        }
        if self.position.y > height {
            self.position.y = 0.0;
        } else if self.position.y < 0.0 {
            self.position.y = height;
        }
    }

    pub fn flock(&mut self, boids: &[Boid]) {
        let align = self.alignment(boids);
        let separate = self.separation(boids);
        let cohesion_vector = self.cohesion(boids);

        self.acceleration.add_vec(align);
        self.acceleration.add_vec(cohesion_vector);
        self.acceleration.add_vec(separate);
    }

    pub fn separation(&self, boids: &[Boid]) -> Vector2 {
        let mut close = Vector2::default();
        let mut neigbor_count = 0;

        for boid in boids {
            if self == boid {
                continue;
            }
            let distance = self.position.distance(&boid.position);
            if distance < self.protected_range {
                let mut d = Vector2 {
                    x: self.position.x - boid.position.x,
                    y: self.position.y - boid.position.y,
                };
                d.div(distance * distance);
                close.add_vec(d);
                neigbor_count += 1;
            }
        }

        if neigbor_count > 0 {
            close.div(neigbor_count as f32);
            close.set_mag(self.max_speed);
            close.sub_vec(self.velocity);
            close.limit(self.max_force);
        }

        close
    }

    pub fn alignment(&self, boids: &[Boid]) -> Vector2 {
        let mut average_velocity = Vector2::default();
        let mut neighbor_count = 0;

        for boid in boids {
            if self == boid {
                continue;
            }
            let distance = self.position.distance(&boid.position);
            if distance < self.visual_range {
                average_velocity.add_vec(boid.velocity);
                neighbor_count += 1;
            }
        }

        if neighbor_count > 0 {
            average_velocity.div(neighbor_count as f32);
            average_velocity.set_mag(self.max_speed);
            average_velocity.sub_vec(self.velocity);
            average_velocity.limit(self.max_force);
        }

        average_velocity
    }

    pub fn cohesion(&self, boids: &[Boid]) -> Vector2 {
        let mut average_position = Vector2::default();
        let mut neighbor_count = 0.0;

        for boid in boids {
            if self == boid {
                continue;
            }
            let distance = self.position.distance(&boid.position);
            if distance < self.visual_range * 2.0 {
                average_position.add_vec(boid.position);
                neighbor_count += 1.0;
            }
        }

        if neighbor_count > 0.0 {
            average_position.div(neighbor_count);
            average_position.sub_vec(self.position);
            average_position.set_mag(self.max_speed);
            average_position.sub_vec(self.velocity);
            average_position.limit(self.max_force);
        }

        average_position
    }
}
