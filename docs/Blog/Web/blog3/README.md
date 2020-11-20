## JavaScript中的var与作用域
> 2019-12-28 14:13:54 
<br>分类专栏：js 作用域 

JavaScript中没有块级作用域，“块级作用域”中声明的变量将被添加到当前的执行环境中

```c
if(true) {
  var color = "blue";
}
console.log(color); // "blue"
```

```c
function test() {
  if(true) {
    var color = "blue"; // (当前执行环境为函数test的局部作用域，函数外部无法访问，内部可以访问)
  }
  console.log("blue"); // "blue"
  function inner() {
    console.log(color); // "blue"
  }
  inner();
}
test();
console.log(color); // ReferenceError: color is not defined
```
在JavaScript中，由for语句创建的变量，即使在for循环执行结束后，也依旧会存在于循环外部的执行环境中。

```c
for(var i = 0; i < 10; i++) {  
  var color = "blue";  
}
console.log(i); // 10 
console.log(color); // "blue"
```
使用var声明的变量会自动被添加到最接近的环境中。在函数内部，最接近的环境就是函数的局部环境；在with语句中，最接近的环境是函数环境。
如果初始化变量时没有使用var声明，该变量会自动被添加到全局环境。

```c
function add(num1, num2) {
  var sum = num1 + num2; // 用var声明
  return sum;
}
console.log(add(10, 20)); // 30
console.log(sum); // ReferenceError: sum is not defined
```

```c
function add(num1, num2) {
  sum = num1 + num2; // 没有使用var声明
  return sum;
}
console.log(add(10, 20)); // 30
console.log(sum); // 30
```
如果局部环境中存在着同名标识符，就不会使用位于父环境中的标识符。

```c
var color = "blue";
function getColor() {
  console.log(color); // undefined (变量提升)

  var color = "red"; 
  console.log(color); // red

  console.log(window.color); // blue

  return color;
}

console.log('return: ', getColor()); // return: red
console.log(color); // blue
```
