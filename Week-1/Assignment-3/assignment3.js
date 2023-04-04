javascript
function countAandB(input){
  let aCount = 0;
  let bCount = 0;
  
  for (let i = 0; i < input.length; i++) {
    if (input[i] === 'a') {
      aCount++;
    } 
    else if (input[i] === 'b') {
      bCount++;
    }
  }
  return aCount+bCount;
}

function toNumber(input){
  let numArr = [];
  for (let i = 0; i < input.length; i++) {
    let charCode = input[i].charCodeAt(0) - 96; 
      if (charCode >= 1 && charCode <= 26) { 
      numArr.push(charCode); 
      }
  }
  return numArr;
}
let input1 = ['a', 'b', 'c', 'a', 'c', 'a', 'c'];
console.log(countAandB(input1));
console.log(toNumber(input1));

let input2 = ['e', 'd', 'c', 'd', 'e'];
console.log(countAandB(input2));
console.log(toNumber(input2));
