function count(input) {
  const obj = {};
  input.forEach(char => {
    if (char in obj){
      obj[char]++;
    } else {
        obj[char] = 1;
      }
  })
  return obj;
}

let input1 = ["a", "b", "c", "a", "c", "a", "x"];
console.log(count(input1));

function groupByKey(input) { 
    // your code here
  const obj = {};
    input.forEach(entry => {
        if (obj[entry.key] !== obj.property){
          obj[entry.key] += entry.value;
        } else{
          obj[entry.key] = entry.value;
        }
    });
  return obj
}
let input2 = [
{ key: "a", value: 3 },
{ key: "b", value: 1 },
{ key: "c", value: 2 },
{ key: "a", value: 3 },
{ key: "c", value: 5 },
];
console.log(groupByKey(input2));