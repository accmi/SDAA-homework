import { Point } from "./Point";

export abstract class Shape {
    abstract getType(): string;

    protected color: string;
    protected filled: boolean;

    points: Point[];

    constructor(points: Point[]);
    constructor(points: Point[], color?: string, filled?: boolean) {
        if (points.length < 3) {
            throw('There should be more then 2 points');
        }

        this.points = points;
        this.color = color ? color : 'green';
        this.filled = filled !== undefined ? filled : true;
    }

    toString(): string {
        return `A Shape with color of ${this.color} and ${this.filled ? 'filled' : 'not filled'}. Points: ${this.points.join(', ')}.`;
    }

    getPerimeter(): number {
        /**
         * It seems to me that this method should be encapsulated into
         * subclasses of particular shapes, because the formula is unique
         * for different shapes
         * to pass the test I am using the formula for a triangle a + b + c
         */
        const distances = this.distances;

        return distances.reduce((acc, distance) => acc + distance, 0);
    }

    protected get distances(): number[] {
        return this.points.reduce((acc: number[], point, index, origin) => {
            const nextPoint = index + 1 <= origin.length - 1 ? origin[index + 1] : null;

            if (nextPoint) {
                const distance = point.distance(nextPoint);
                
                return [...acc, distance];
            }

            const distance = point.distance(origin[0]);

            return [...acc, distance];
        }, []);
    }
}
