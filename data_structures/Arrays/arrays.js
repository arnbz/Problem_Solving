let keyboards = ['Realforce', 'HHKB', 'Filco', 'Keychron'];

// copy an array by value
let keyboards2 = keyboards.slice();

// copy by reference
keyboards2 = keyboards;
console.log(keyboards === keyboards2);
keyboards2[2] = 'WASD';
console.log(keyboards);

// entries
let iterator = keyboards.entries();
// produces 'undefined' when reaches array end
console.log(iterator.next().value);

iterator = keyboards.keys();
for (let keys of iterator) {
  console.log(keys);
}
