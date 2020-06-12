//
// This is only a SKELETON file for the 'Resistor Color Duo' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

export const decodedValue = (resistorColor) => {
  let colorCode1 = COLORS.indexOf(resistorColor[0]);
  let colorCode2 = COLORS.indexOf(resistorColor[1]);
  return colorCode1 * 10 + colorCode2;
};

const COLORS = [
  'black',
  'brown',
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
  'grey',
  'white',
];
