/**
 * @param {number} n
 * @return {number}
 */
function min(i, j, k) {
  if (i < j) {
    if (i < k) return i;
    else return k;
  } else if (j < k) {
    return j;
  } else return k;
}

function update(variables, uglyNumbers, min) {
  if (2 * uglyNumbers[variables.i] === min) {
    variables.i++;
  }
  if (3 * uglyNumbers[variables.j] === min) {
    variables.j++;
  }
  if (5 * uglyNumbers[variables.k] === min) {
    variables.k++;
  }
}

var nthUglyNumber = function (n) {
  var uglyNumbers = new Array();
  uglyNumbers[0] = 1;

  if (n === 1) return 1;

  var variables = { i: 0, j: 0, k: 0 };

  var count = 1;
  var minimum;
  while (count < n) {
    minimum = min(
      uglyNumbers[variables.i] * 2,
      uglyNumbers[variables.j] * 3,
      uglyNumbers[variables.k] * 5
    );

    uglyNumbers.push(minimum);
    update(variables, uglyNumbers, minimum);

    count++;
  }

  return minimum;
};

// console.log(nthUglyNumber(15));
