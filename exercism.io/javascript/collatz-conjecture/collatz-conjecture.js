//
// This is only a SKELETON file for the 'Collatz Conjecture' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const steps = (number) => {
  let stepCount = 0;

  if (number <= 0) {
    throw new Error('Only positive numbers are allowed');
  }

  while (number !== 1) {
    number % 2 === 0 ? (number /= 2) : (number = 3 * number + 1);
    stepCount++;
  }

  return stepCount;
};
