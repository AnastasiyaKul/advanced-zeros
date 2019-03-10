getPrimes = function (num) {
  let arr = [];
  if(num > 1){
    for(let i = 2; i <= num; i++){
      while(num % i === 0 && num > 1){
        arr.push(i);
        num = num / i;
      }
    }
    return arr;
  } else if(num === 1){
    return [1];
  }
};

getPrimesMap = function(num) {
  let arr = getPrimes(num);
  let map = new Map();
  for(let i = 0; i < arr.length; i++) {
    if(map.has(arr[i])) {
      map.set(arr[i], map.get(arr[i]) + 1);
    } else {
      map.set(arr[i], 1);
    }
  }

  return map;
};

getDividersCount = function(num, p) {
  if (num === 0) {return 0}
  return Math.trunc(num / p) + getDividersCount(Math.trunc(num / p), p);
};

module.exports = function getZerosCount(number, base) {
  let basePrimes = getPrimesMap(base);
  let primesCount = new Map();
  for (let i of basePrimes.keys()) {
    primesCount.set(i, Math.trunc(getDividersCount(number, i) / basePrimes.get(i)));
  }

  let minCount = -1;
  for (let num of primesCount.values()) {
    if(num < minCount || minCount === -1) {
      minCount = num;
    }
  }

  return minCount;
};