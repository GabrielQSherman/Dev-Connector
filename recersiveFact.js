var readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

rl.question('Enter a number to get its factorial\nNumber: ', (num) => {

    function factor(num) {
        
        if (num == 0) {

            return 1;
            
        } else if (num < 0) {
            
            return NaN;

        } else {
            
            return num * factor(num-1);
        }
    }

    console.log(`\nThe factorial of ${num} is ${factor(num)}.`);
    rl.close()
})