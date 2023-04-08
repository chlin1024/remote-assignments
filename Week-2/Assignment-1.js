/*Assignment 1: Function and Array
1. max: find the max value of an array of numbers
2. findPosition: find the first position of the target number inside an array of numbers.
The position should be counted starting from 0, if you can't find the target, please return -1*/
function max(numbers) {
    let max = 0;
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] > max) {
          max = numbers[i] ;
        }
    }
  return max
}
 function findPosition(numbers, target) {
    let position = 0;
    for (i = 0; i < numbers.length; i++) {
        if (numbers[i] === target) {
            position = i;
            break;
        } else {
            position = -1;
        }
    }
  return position;
}

console.log(max([1, 2, 4, 5])); // should print 5
console.log(max([5, 2, 7, 1, 6])); // should print 7
console.log(findPosition([5, 2, 7, 1, 6], 5)); // should print 0
console.log(findPosition([5, 2, 7, 1, 6], 7)); // should print 2
console.log(findPosition([5, 2, 7, 7, 7, 1, 6], 7)); // should print 2 (the first position) 
console.log(findPosition([5, 2, 7, 1, 6], 8)); // should print -1