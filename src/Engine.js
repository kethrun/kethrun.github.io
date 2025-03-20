import { rend } from "/main.js";

export class Engine {
  constructor() {
    // N/A
  }
  
  handleFrame(t) {
    rend.ctx.fillStyle = "#000000";
    rend.ctx.fillRect(0, 0, rend.width, rend.height);
    
    rend.ctx.fillStyle = "#ffffff";
    rend.ctx.fillText(t, 16, 16);
    rend.ctx.fillText(rend.fps, 16, 32);
  }
}
