import { Renderer } from "/Renderer.js";
import { Engine } from "/Engine.js";

console.log("Kethrun Engine");

export const rend = new Renderer();
export const engine = new Engine();

rend.frameCallback = engine.handleFrame;
