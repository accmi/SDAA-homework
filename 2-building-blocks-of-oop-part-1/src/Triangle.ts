import { Point } from './Point';
import { Shape } from './Shape';

enum TriangleType {
  EQUILATERAL_TRIANGLE = 'equilateral triangle',
  ISOSCELES_TRIANGLE = 'isosceles triangle',
  SCALENE_TRIANGLE = 'scalene triangle',
}

export class Triangle extends Shape {
  protected postInitialize(): void {
    console.info('Triangle is initialized');
  }

  constructor(point1: Point, point2: Point, point3: Point);
  constructor(point1: Point, point2: Point, point3: Point, color?: string, filled?: boolean) {
    super([point1, point2, point3]);

    /** if I run this I get this error: Expected 1 arguments, but got 3.
    * Not clear for me why overloaded constructor in superclass doesn't work
    */
    // super([point1, point2, point3], color, filled);
  }

  toString(): string {
    const points = this.points.reduce((acc, point, index) =>
      `${acc}${index === 0 ? '' : ','}v${index+1}=${point.toString()}`, '');

    return `Triangle[${points}]`;
  }

  getType(): TriangleType {
    if (this.distances.every((distance) => distance === this.distances[0])) {
      return TriangleType.EQUILATERAL_TRIANGLE;
    }

    let isEquilateral: boolean | null = null;
    let isiSosceles: boolean | null = null;
    let isScalene: boolean | null = null;

    this.distances.forEach((distance, index) => {
      const theRest = this.distances.filter((_, i) => i !== index);

      isEquilateral = theRest.every((d) => Math.round(d) === Math.round(distance));
      isiSosceles = theRest.some((d) => d === distance);
      isScalene =  theRest.every((d) => d !== distance);
    });

    if (isEquilateral) {
      return TriangleType.EQUILATERAL_TRIANGLE;  
    }

    if (isiSosceles) {
      return TriangleType.ISOSCELES_TRIANGLE;
    }

    if (isScalene) {
      return TriangleType.SCALENE_TRIANGLE;
    }


    throw('This triangle is not shaped appropriately');
  }
}
