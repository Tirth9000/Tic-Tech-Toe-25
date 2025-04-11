// logic - break it down plz....
// variable naming : will camelCase 
// let, var, const
// let mutable variable change it, scoped 
// do not use var // global
// const // constant variable you can not re-assign it's value
// if it's an object you can modify it's properties 

func{
    let a = 2 // scoped 

}
a // this is error 


const PI = 3.14
PI = 5 // gives an error assignment to a constant 
const obj = {
    name: 'jii'
}
obj.name = 'hii' // this is fine 
obj = { abc:'abc' } // this is not permitted re-assignment 

// BEST practice 
for objects, for elements, for lists, for arrow/functions use : const
const add = (a,b) => a+b // this is an arrow fun.
const add = function (a,b){

}
const element = <h1>hii<h1>
const list = ['1', '1' , '3'] 
list.push(1)
list.pop() 
list = [ ] // not allowed
let a = 10, let b = 'hii',
