
export class Point {
    constructor(
        public x: number,
        public y: number
    ) {}

    distance(x: number, y: number) {
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a * a + b * b);
    }
}