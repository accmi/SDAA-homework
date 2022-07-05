export class Point {
  private x: number;
  private y: number;

  constructor();
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`
  }

  distance(): number;
  distance(point: Point): number;
  distance(x: number, y: number): number;

  distance(xOrPoint?: number | Point, y?: number): number {
    if (xOrPoint !== undefined && typeof xOrPoint !== 'number') {
      return this.getDistance(xOrPoint.x, xOrPoint.y);
    }

    if (xOrPoint !== undefined && y !== undefined) {
      return this.getDistance(xOrPoint as number, y);
    }

    return this.getDistance(0, 0);
  }

  private getDistance(x: number, y: number): number {
    return Math.sqrt(((this.x - x) ** 2) + ((this.y - y) ** 2));
  }
}
