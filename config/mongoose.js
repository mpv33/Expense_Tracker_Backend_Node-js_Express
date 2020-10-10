//require mongoose
const mongoose = require('mongoose');
//connect Database
mongoose.connect('mongodb+srv://mpv33:uV7Pe6CLrRFw4Eb2@cluster0.8jpev.mongodb.net/contact_list_db?retryWrites=true&w=majority');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
//aquire connection to check if successful
const db = mongoose.connection;
// error
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log('Successfully Connected to the database');
})
