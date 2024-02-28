// .seedgooserc.js
module.exports ={
    modelBaseDirectory: 'app_server/models', // Model directory name
    models: ['*.js', '!db.js'], // Model matcher
    data: 'data', // Data directory name
    db: 'mongodb://127.0.0.1:27017/travlr' // Db connection url
};