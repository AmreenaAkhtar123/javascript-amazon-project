import { formatCurrency } from "../scripts/utlis/money.js";
console.log('test suite:');
console.log('Convert cents into dollars');
if (formatCurrency(2095) === '20.95' ){
  console.log('pass');
}
else{
  console.log('fail');
}


console.log('Work with zero');
if (formatCurrency(0) === '0.00' ){
  console.log('pass');
}
else{
  console.log('fail');
}

console.log('Rounds up to the nearest cent');
if (formatCurrency(2000.5) === '20.01' ){
  console.log('pass');
}
else{
  console.log('fail');
}