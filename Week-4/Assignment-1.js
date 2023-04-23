// A
function delayedResult(n1, n2, delayTime, callback) {
    let result = n1 + n2;
    setTimeout(()=> {callback(result)}, delayTime);
}

delayedResult(4, 5, 3000, function (result) {
console.log(result);
}); // 9 (4+5) will be shown in the console after 3 seconds
delayedResult(-5, 10, 2000, function (result) { console.log(result);
}); // 5 (-5+10) will be shown in the console after 2 seconds

// B
function delayedResultPromise(n1, n2, delayTime) { 
    const promise = new Promise((res, req) => {
        let result = n1 + n2;
        setTimeout(() => {res(result)}, delayTime);
    } );
return promise;
}
delayedResultPromise(4, 5, 3000).then(console.log);
// 9 (4+5) will be shown in the console after 3 seconds

//C
async function main() {
    let result = await delayedResultPromise(4, 5, 3000);
    console.log(result);
}
main(); // result will be shown in the console after <delayTime> seconds