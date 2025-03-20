import { rend } from "/main.js";

export class Engine {
  #tick = 0;
  #tickInterval;
  #world;
  
  constructor(world) {
    this.#world = world;
    rend.frameCallback = (t) => this.#handleFrame(t);
    
    this.#tickInterval = setInterval(() => this.#handleTick(), 50);
  }
  
  destroy() {
    rend.frameCallback = undefined;
    clearInterval(this.#tickInterval);
  }
  
  #handleTick() {
    this.#tick++;
  }
  
  #handleFrame(t) {
    rend.ctx.fillStyle = "#000000";
    rend.ctx.fillRect(0, 0, rend.width, rend.height);
    
    rend.ctx.fillStyle = "#ffffff";
    rend.ctx.fillText(this.#tick, 16, 16);
  }
}
