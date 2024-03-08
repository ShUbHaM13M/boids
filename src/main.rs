use boidlib::boids::Boids;
use macroquad::prelude::*;
use macroquad::rand;
use macroquad::ui::hash;
use macroquad::ui::root_ui;
use macroquad::ui::widgets;

static MAX_SPEED: f32 = 6.0;
static MAX_FORCE: f32 = 0.01;

#[macroquad::main("Boids")]
async fn main() {
    let current_time = std::time::SystemTime::now();
    rand::srand(
        current_time
            .duration_since(std::time::UNIX_EPOCH)
            .expect("Something happened with the Time.., Are You time-travelling?!")
            .as_secs(),
    );
    let background: Color = Color::from_hex(0x121212);

    let mut avoid_factor = 0.05;
    let mut centering_factor = 0.0005;
    let mut matching_factor = 0.05;

    let mut boids = Boids::new(200);
    boids.max_force = MAX_FORCE;
    boids.max_speed = MAX_SPEED;
    boids.avoid_factor = avoid_factor;
    boids.centering_factor = centering_factor;
    boids.matching_factor = matching_factor;
    boids.randomize(screen_width(), screen_height());

    // TODO: Abstract this
    // for boid in &mut boids.children {
    //     boid.set_position(
    //         rand::gen_range(0.0, screen_width()),
    //         rand::gen_range(0.0, screen_height()),
    //     );
    //     boid.set_velocity(rand::gen_range(0.0, 1.0), rand::gen_range(0.0, 1.0));
    //     boid.velocity.mul(rand::gen_range(2.0, 4.0));
    //     boid.visual_range = 40.0;
    //     boid.protected_range = 8.0;
    //     boid.turn_factor = 0.2;
    //     boid.max_speed = MAX_SPEED;
    //     boid.max_force = MAX_FORCE;
    // }

    loop {
        clear_background(background);

        for boid in &boids.children {
            draw_circle(boid.position.x, boid.position.y, 4.0, WHITE);
        }

        boids.flock();
        boids.update();
        boids.check_edges(screen_width(), screen_height());

        widgets::Window::new(
            hash!(),
            vec2(screen_width() * 0.5 - 175.0, screen_height() * 0.6),
            vec2(350.0, 100.0),
        )
        .label("Controls")
        .titlebar(true)
        .close_button(false)
        .ui(&mut root_ui(), |ui| {
            ui.slider(hash!(), "Avoid", 0.0..1.0, &mut avoid_factor);
            ui.slider(hash!(), "Centering", 0.0..1.0, &mut centering_factor);
            ui.slider(hash!(), "Matching", 0.0..1.0, &mut matching_factor);
        });

        boids.avoid_factor = avoid_factor;
        boids.centering_factor = centering_factor;
        boids.matching_factor = matching_factor;
        next_frame().await
    }
}
