export class World {
  #chunks;
  
  constructor() {
    this.#chunks = [];
    
    for (let y = 0; y < 64; y++) {
      this.#chunks[y] = [];
      for (let x = 0; x < 64; x++) {
        this.#chunks[y][x] = this.#generateChunk();
      }
    }
  }
  
  #generateChunk() {
    let chunk = [];
    
    for (let y = 0; y < 16; y++) {
      chunk[y] = [];
      for (let x = 0; x < 16; x++) {
        chunk[y][x] = Math.floor(Math.random() * 4);
      }
    }
    
    return chunk;
  }
  
  getChunk(x, y) {
    if (this.#chunks[y]?.[x]) {
      return new Chunk(this.#chunks[y][x]);
    } else {
      return undefined;
    }
  }
}

export class Chunk {
  #canvas;
  #ctx;
  
  constructor(blocks) {
    this.blocks = blocks;
    this.canvas = new OffscreenCanvas(16*32, 16*32);
    this.#ctx = this.canvas.getContext("2d");
    this.#render();
  }
  
  #render() {
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        switch (this.blocks[y][x]) {
          case 0:
            this.#ctx.fillStyle = "#0080ff";
          break;
          case 1:
            this.#ctx.fillStyle = "#008000";
          break;
          case 2:
            this.#ctx.fillStyle = "#ffff80";
          break;
          case 3:
            this.#ctx.fillStyle = "#808080";
          break;
          default:
            this.#ctx.fillStyle = "#ff00ff";
            console.warn(`Unknown block ${this.blocks[y][x]}`);
        }
        
        this.#ctx.fillRect(x*32, y*32, 32, 32);
      }
    }
  }
}
