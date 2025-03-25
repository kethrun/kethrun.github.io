import { rend } from "/main.js";
import { Pos } from "/utils.js";

export class Engine {
  #tick = 0;
  #tickTime = 0;
  #tickInterval;
  
  #world;
  #loadedChunks = [
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
    [undefined, undefined, undefined, undefined, undefined],
  ];
  
  #camera = new Pos(0, 0);
  #cameraPrev;
  #cameraChunk;
  #cameraChunkPrev;
  
  constructor(world) {
    this.#world = world;
    
    this.#handleTick();
    
    rend.frameCallback = (t) => this.#handleFrame(t);
    this.#tickInterval = setInterval(() => this.#handleTick(), 50);
  }
  
  destroy() {
    rend.frameCallback = undefined;
    clearInterval(this.#tickInterval);
  }
  
  #handleTick() {
    if (this.#tick == 0) {
      // REMOVE AFTER MAKING OTHER CASE
      this.#cameraChunk = new Pos(Math.floor(this.#camera.x / 16*32), Math.floor(this.#camera.y / 16*32));
      
      for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
          this.#loadedChunks[y][x] = this.#world.getChunk(this.#cameraChunk.x + x - 2, this.#cameraChunk.y + y - 2);
        }
      }
      
      this.#cameraPrev = this.#camera;
      this.#cameraChunkPrev = this.#cameraChunk;
    } else {
      if (!this.#camera.eq(this.#cameraPrev)) {
        this.#cameraChunk = new Pos(Math.floor(this.#camera.x / 16*32), Math.floor(this.#camera.y / 16*32));
        this.#cameraPrev = this.#camera;
      }
      
      if (!this.#cameraChunk.eq(this.#cameraChunkPrev)) {
        // LOAD CHUNKS
        this.#cameraChunkPrev = this.#cameraChunk;
      }
    }
    
    this.#tick++;
    this.#tickTime = performance.now();
  }
  
  #handleFrame(t) {
    rend.ctx.fillStyle = "#000000";
    rend.ctx.fillRect(0, 0, rend.width, rend.height);
    
    // FIXME: Account for tick interpolation
    let cameraOffset = new Pos(this.#camera.x % 16*32 + Math.round(rend.width/2), this.#camera.y % 16*32 + Math.round(rend.height/2));
    
    for (let y = 0; y < 5; y++) {
      for (let x = 0; x < 5; x++) {
        if (this.#loadedChunks[y][x]) {
          rend.ctx.drawImage(this.#loadedChunks[y][x].canvas, cameraOffset.x + (x - 2) * 16*32, cameraOffset.y + (y - 2) * 16*32);
        }
      }
    }
  }
}
