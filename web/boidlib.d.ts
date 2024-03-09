/* tslint:disable */
/* eslint-disable */
/**
*/
export class Boid {
  free(): void;
/**
*/
  acceleration: Vector2;
/**
*/
  max_force: number;
/**
*/
  max_speed: number;
/**
*/
  position: Vector2;
/**
*/
  protected_range: number;
/**
*/
  turn_factor: number;
/**
*/
  velocity: Vector2;
/**
*/
  visual_range: number;
}
/**
*/
export class Boids {
  free(): void;
/**
* @param {number} count
*/
  constructor(count: number);
/**
* @returns {(Boid)[]}
*/
  get_children(): (Boid)[];
/**
* @param {number} screen_width
* @param {number} screen_height
*/
  randomize(screen_width: number, screen_height: number): void;
/**
* @param {number} width
* @param {number} height
*/
  check_edges(width: number, height: number): void;
/**
*/
  flock(): void;
/**
*/
  update(): void;
/**
*/
  avoid_factor: number;
/**
*/
  centering_factor: number;
/**
*/
  matching_factor: number;
/**
*/
  max_force: number;
/**
*/
  max_speed: number;
}
/**
*/
export class Vector2 {
  free(): void;
/**
* @param {Vector2} other
*/
  add_vec(other: Vector2): void;
/**
* @param {Vector2} other
*/
  sub_vec(other: Vector2): void;
/**
* @param {number} scalar
*/
  div(scalar: number): void;
/**
* @param {number} scalar
*/
  mul(scalar: number): void;
/**
* @param {number} scalar
*/
  limit(scalar: number): void;
/**
* @returns {number}
*/
  length(): number;
/**
*/
  normalize(): void;
/**
* @param {number} scalar
*/
  set_mag(scalar: number): void;
/**
* @param {Vector2} other
* @returns {number}
*/
  distance(other: Vector2): number;
/**
*/
  x: number;
/**
*/
  y: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_vector2_free: (a: number) => void;
  readonly __wbg_get_vector2_x: (a: number) => number;
  readonly __wbg_set_vector2_x: (a: number, b: number) => void;
  readonly __wbg_get_vector2_y: (a: number) => number;
  readonly __wbg_set_vector2_y: (a: number, b: number) => void;
  readonly vector2_add_vec: (a: number, b: number) => void;
  readonly vector2_sub_vec: (a: number, b: number) => void;
  readonly vector2_div: (a: number, b: number) => void;
  readonly vector2_mul: (a: number, b: number) => void;
  readonly vector2_limit: (a: number, b: number) => void;
  readonly vector2_length: (a: number) => number;
  readonly vector2_normalize: (a: number) => void;
  readonly vector2_set_mag: (a: number, b: number) => void;
  readonly vector2_distance: (a: number, b: number) => number;
  readonly __wbg_boid_free: (a: number) => void;
  readonly __wbg_get_boid_position: (a: number) => number;
  readonly __wbg_set_boid_position: (a: number, b: number) => void;
  readonly __wbg_get_boid_velocity: (a: number) => number;
  readonly __wbg_set_boid_velocity: (a: number, b: number) => void;
  readonly __wbg_get_boid_acceleration: (a: number) => number;
  readonly __wbg_set_boid_acceleration: (a: number, b: number) => void;
  readonly __wbg_get_boid_visual_range: (a: number) => number;
  readonly __wbg_set_boid_visual_range: (a: number, b: number) => void;
  readonly __wbg_get_boid_protected_range: (a: number) => number;
  readonly __wbg_set_boid_protected_range: (a: number, b: number) => void;
  readonly __wbg_get_boid_max_speed: (a: number) => number;
  readonly __wbg_set_boid_max_speed: (a: number, b: number) => void;
  readonly __wbg_get_boid_max_force: (a: number) => number;
  readonly __wbg_set_boid_max_force: (a: number, b: number) => void;
  readonly __wbg_get_boid_turn_factor: (a: number) => number;
  readonly __wbg_set_boid_turn_factor: (a: number, b: number) => void;
  readonly __wbg_boids_free: (a: number) => void;
  readonly __wbg_get_boids_avoid_factor: (a: number) => number;
  readonly __wbg_set_boids_avoid_factor: (a: number, b: number) => void;
  readonly __wbg_get_boids_matching_factor: (a: number) => number;
  readonly __wbg_set_boids_matching_factor: (a: number, b: number) => void;
  readonly __wbg_get_boids_centering_factor: (a: number) => number;
  readonly __wbg_set_boids_centering_factor: (a: number, b: number) => void;
  readonly __wbg_get_boids_max_force: (a: number) => number;
  readonly __wbg_set_boids_max_force: (a: number, b: number) => void;
  readonly __wbg_get_boids_max_speed: (a: number) => number;
  readonly __wbg_set_boids_max_speed: (a: number, b: number) => void;
  readonly boids_new: (a: number) => number;
  readonly boids_get_children: (a: number, b: number) => void;
  readonly boids_randomize: (a: number, b: number, c: number) => void;
  readonly boids_check_edges: (a: number, b: number, c: number) => void;
  readonly boids_flock: (a: number) => void;
  readonly boids_update: (a: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
