/** 
 * Function called whenever a message is sent to the worker.
 * 
 * This particular function generates numbers and returns any that are primes.
 * 
 * Since we're in a worker we cannot access the DOM, or variables not attached
 * to the message.
 */
onmessage = function(e) {
  let primes = [];

  // The number of primes to find is retrived from the message
  const numPrimes = e.data 

  while(primes.length < numPrimes){
    let candidate = (Math.floor(50000 * Math.random()) + 1) * Math.floor(10000000000 * Math.random())
    let isPrime = true;
    for (let c = 2; c <= Math.sqrt(candidate); c++){
      if(candidate % c === 0){
        isPrime = false;
        break;
      }
    }
    if(isPrime){
      primes.push(candidate)
    }
  }
  // Here we return the primes in a message
  postMessage(primes)
}