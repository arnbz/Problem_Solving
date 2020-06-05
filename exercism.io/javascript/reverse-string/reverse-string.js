//
// This is only a SKELETON file for the 'Reverse String' exercise. It's been provided as a
// convenience to get you started writing code faster.
//

'use strict';

export const reverseString = (stringToReverse) => {
  let stringArray = stringToReverse.split('');
  let start = 0;
  let end = stringToReverse.length - 1;

  while (start < end) {
    let swap = stringArray[start];
    stringArray[start] = stringArray[end];
    stringArray[end] = swap;
    start++;
    end--;
  }

  return stringArray.join('');
};
