const mongoose = require('mongoose');
const host = process.env.DB_HOST || '127.0.0.1';
let dbURI = 'mongodb://127.0.0.1:27017/travlr'; 
const readLine = require('readline');

//mongoose.set('useUnifiedTopology', true);

const connect = () => {
    setTimeout(() => mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }), 1000);
}

require('./travlr');

module.exports = {
    connect,
};

mongoose.connection.on('connected', () => {                 
    console.log(`Mongoose connected to ${dbURI}`);            
});                                                         
mongoose.connection.on('error', err => {                    
    console.log(`Mongoose connection error: ${err}`);         
});                                                         
mongoose.connection.on('disconnected', () => {              
    console.log('Mongoose disconnected');                     
});                                                         
const gracefulShutdown = (msg, callback) => {               
    mongoose.connection.close( () => {                        
        console.log(`Mongoose disconnected through ${msg}`);    
        callback();                                             
    });                                                       
};                                                          
// For nodemon restarts                                     
process.once('SIGUSR2', () => {                             
    gracefulShutdown('nodemon restart', () => {               
        process.kill(process.pid, 'SIGUSR2');                   
    });                                                       
});                                                         
// For app termination                                      
process.on('SIGINT', () => {                                
    gracefulShutdown('app termination', () => {               
        process.exit(0);                                        
    });                                                       
});                                                         
// For Heroku app termination                               
process.on('SIGTERM', () => {                               
    gracefulShutdown('Heroku app shutdown', () => {           
        process.exit(0);                                        
    });                                                       
});

connect();

require('./travlr');