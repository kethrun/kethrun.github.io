import { Renderer } from "/Renderer.js";
import { Engine } from "/Engine.js";
import { World } from "/World.js";

console.log("Kethrun Engine");

export const rend = new Renderer();
export const engine = new Engine(new World());
