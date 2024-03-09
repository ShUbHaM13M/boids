import * as __wbg_star0 from './snippets/boid-d3901015b6976971/web/random.js';

let wasm;

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

let heap_next = heap.length;

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getObject(idx) { return heap[idx]; }

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}

const BoidFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boid_free(ptr >>> 0));
/**
*/
export class Boid {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Boid.prototype);
        obj.__wbg_ptr = ptr;
        BoidFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoidFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boid_free(ptr);
    }
    /**
    * @returns {Vector2}
    */
    get position() {
        const ret = wasm.__wbg_get_boid_position(this.__wbg_ptr);
        return Vector2.__wrap(ret);
    }
    /**
    * @param {Vector2} arg0
    */
    set position(arg0) {
        _assertClass(arg0, Vector2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_position(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vector2}
    */
    get velocity() {
        const ret = wasm.__wbg_get_boid_velocity(this.__wbg_ptr);
        return Vector2.__wrap(ret);
    }
    /**
    * @param {Vector2} arg0
    */
    set velocity(arg0) {
        _assertClass(arg0, Vector2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_velocity(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {Vector2}
    */
    get acceleration() {
        const ret = wasm.__wbg_get_boid_acceleration(this.__wbg_ptr);
        return Vector2.__wrap(ret);
    }
    /**
    * @param {Vector2} arg0
    */
    set acceleration(arg0) {
        _assertClass(arg0, Vector2);
        var ptr0 = arg0.__destroy_into_raw();
        wasm.__wbg_set_boid_acceleration(this.__wbg_ptr, ptr0);
    }
    /**
    * @returns {number}
    */
    get visual_range() {
        const ret = wasm.__wbg_get_boid_visual_range(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set visual_range(arg0) {
        wasm.__wbg_set_boid_visual_range(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get protected_range() {
        const ret = wasm.__wbg_get_boid_protected_range(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set protected_range(arg0) {
        wasm.__wbg_set_boid_protected_range(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_speed() {
        const ret = wasm.__wbg_get_boid_max_speed(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_speed(arg0) {
        wasm.__wbg_set_boid_max_speed(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_force() {
        const ret = wasm.__wbg_get_boid_max_force(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_force(arg0) {
        wasm.__wbg_set_boid_max_force(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get turn_factor() {
        const ret = wasm.__wbg_get_boid_turn_factor(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set turn_factor(arg0) {
        wasm.__wbg_set_boid_turn_factor(this.__wbg_ptr, arg0);
    }
}

const BoidsFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_boids_free(ptr >>> 0));
/**
*/
export class Boids {

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        BoidsFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_boids_free(ptr);
    }
    /**
    * @returns {number}
    */
    get avoid_factor() {
        const ret = wasm.__wbg_get_boids_avoid_factor(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set avoid_factor(arg0) {
        wasm.__wbg_set_boids_avoid_factor(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get matching_factor() {
        const ret = wasm.__wbg_get_boids_matching_factor(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set matching_factor(arg0) {
        wasm.__wbg_set_boids_matching_factor(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get centering_factor() {
        const ret = wasm.__wbg_get_boids_centering_factor(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set centering_factor(arg0) {
        wasm.__wbg_set_boids_centering_factor(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_force() {
        const ret = wasm.__wbg_get_boids_max_force(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_force(arg0) {
        wasm.__wbg_set_boids_max_force(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get max_speed() {
        const ret = wasm.__wbg_get_boids_max_speed(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set max_speed(arg0) {
        wasm.__wbg_set_boids_max_speed(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} count
    */
    constructor(count) {
        const ret = wasm.boids_new(count);
        this.__wbg_ptr = ret >>> 0;
        return this;
    }
    /**
    * @returns {(Boid)[]}
    */
    get_children() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.boids_get_children(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {number} screen_width
    * @param {number} screen_height
    */
    randomize(screen_width, screen_height) {
        wasm.boids_randomize(this.__wbg_ptr, screen_width, screen_height);
    }
    /**
    * @param {number} width
    * @param {number} height
    */
    check_edges(width, height) {
        wasm.boids_check_edges(this.__wbg_ptr, width, height);
    }
    /**
    */
    flock() {
        wasm.boids_flock(this.__wbg_ptr);
    }
    /**
    */
    update() {
        wasm.boids_update(this.__wbg_ptr);
    }
}

const Vector2Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_vector2_free(ptr >>> 0));
/**
*/
export class Vector2 {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Vector2.prototype);
        obj.__wbg_ptr = ptr;
        Vector2Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        Vector2Finalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_vector2_free(ptr);
    }
    /**
    * @returns {number}
    */
    get x() {
        const ret = wasm.__wbg_get_vector2_x(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set x(arg0) {
        wasm.__wbg_set_vector2_x(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get y() {
        const ret = wasm.__wbg_get_vector2_y(this.__wbg_ptr);
        return ret;
    }
    /**
    * @param {number} arg0
    */
    set y(arg0) {
        wasm.__wbg_set_vector2_y(this.__wbg_ptr, arg0);
    }
    /**
    * @param {Vector2} other
    */
    add_vec(other) {
        _assertClass(other, Vector2);
        var ptr0 = other.__destroy_into_raw();
        wasm.vector2_add_vec(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {Vector2} other
    */
    sub_vec(other) {
        _assertClass(other, Vector2);
        var ptr0 = other.__destroy_into_raw();
        wasm.vector2_sub_vec(this.__wbg_ptr, ptr0);
    }
    /**
    * @param {number} scalar
    */
    div(scalar) {
        wasm.vector2_div(this.__wbg_ptr, scalar);
    }
    /**
    * @param {number} scalar
    */
    mul(scalar) {
        wasm.vector2_mul(this.__wbg_ptr, scalar);
    }
    /**
    * @param {number} scalar
    */
    limit(scalar) {
        wasm.vector2_limit(this.__wbg_ptr, scalar);
    }
    /**
    * @returns {number}
    */
    length() {
        const ret = wasm.vector2_length(this.__wbg_ptr);
        return ret;
    }
    /**
    */
    normalize() {
        wasm.vector2_normalize(this.__wbg_ptr);
    }
    /**
    * @param {number} scalar
    */
    set_mag(scalar) {
        wasm.vector2_set_mag(this.__wbg_ptr, scalar);
    }
    /**
    * @param {Vector2} other
    * @returns {number}
    */
    distance(other) {
        _assertClass(other, Vector2);
        const ret = wasm.vector2_distance(this.__wbg_ptr, other.__wbg_ptr);
        return ret;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_boid_new = function(arg0) {
        const ret = Boid.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports['./snippets/boid-d3901015b6976971/web/random.js'] = __wbg_star0;

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;


    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('boidlib_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync }
export default __wbg_init;
