export class Pos {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  
  eq(pos) {
    return this.x == pos.x && this.y == pos.y;
  }
}
