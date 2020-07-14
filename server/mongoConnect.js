const mongoose = require('mongoose');

module.exports = function connectDB (uri) {

    if (!uri) {
        console.log('A MongoDB URI must be included in your .env file for the server to work');
        return 
    }
    
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } )

    mongoose.connection.on( 'open', () => {
        
        console.log(`Database Connected at:\n${uri}\n\n`);
        
    })

    mongoose.connection.on( 'error', (err) => {

        const errMsg = err.message || err; 
        
        console.log(`\nMongo ERROR: ${errMsg}\n`);
        
    })

    mongoose.connection.on( 'connected', (err) => {
        
        console.log(`\nConnecting To Database\n`);
        
    })

    mongoose.connection.on( 'disconnected', (err) => {
        
        console.log(`\nThe Application has been disconnected from the database;\n`);
        
    })
}