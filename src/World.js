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
    return this.#chunks[y][x];
  }
}
