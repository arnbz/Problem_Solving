//
// This is only a SKELETON file for the 'Triangle' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export class Triangle {
  constructor(side1, side2, side3) {
    this.side1 = side1;
    this.side2 = side2;
    this.side3 = side3;
  }

  isEquilateral() {
    if (this.side1 === 0 && this.side2 === 0 && this.side3 === 0) {
      return false;
    }

    return this.side1 === this.side2 && this.side2 === this.side3;
  }

  isIsosceles() {
    let firstSecond =
      this.side1 === this.side2 && this.side1 + this.side2 > this.side3;

    let firstThird =
      this.side1 === this.side3 && this.side1 + this.side3 > this.side2;

    let secondThird =
      this.side2 === this.side3 && this.side2 + this.side3 > this.side1;

    return firstSecond || firstThird || secondThird;
  }

  isScalene() {
    let allSidesUnequal =
      this.side1 !== this.side2 &&
      this.side1 !== this.side3 &&
      this.side2 !== this.side3;

    let sumFirstSecond = this.side1 + this.side2 > this.side3;
    let sumSecondThird = this.side2 + this.side3 > this.side1;
    let sumFirstThird = this.side1 + this.side3 > this.side2;

    return allSidesUnequal && sumFirstSecond && sumFirstThird && sumSecondThird;
  }
}
