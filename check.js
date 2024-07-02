// const str = 'fd,thyt,hello,thth' 
// const arr = str.split(',')
// const join = arr.pop('hello')
// console.log('join :', arr);

const arr = [1, 2, 3]

const result = arr.forEach((number, i)=>{
    console.log(i, '=>' ,number * number);
})

const result2 = arr.map((number, i)=>{
    console.log(i, '=>' ,number * number);
})


console.log('result of arr by forEach', result);
console.log('result of arr by map', result2);