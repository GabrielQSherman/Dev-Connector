let readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

rl.question("Enter a number, your output will be that numbers sumation\nNumber: ", (num) => {
    

    function sum(num) {
        
        // if (num == 0 ) {
        //     return 0
        // } else
         if (num < 0) {
            return num + sum(num + 1);
        } else if (num > 0) {
            return num + sum (num - 1);
        } else {
            return 0
        }
    }

    console.log(sum(num));
    

    rl.close()
});