const randomNumber = async (min,max)=>{
        const randomDecimal = Math.random();
        
        // Scale the decimal to fit the desired range
        const randomNumberInRange = randomDecimal * (max - min) + min;
      
        // Use Math.floor to get the integer value
        return Math.floor(randomNumberInRange);
}

module.exports = randomNumber;