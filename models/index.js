const mongoose = require('mongoose');



mongoose.connect('mongodb+srv://asimriaz:welcome123@nodejs.butlr.mongodb.net/recapsheet', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify:false 
});

module.exports = {
    Student: require('./Student'),
    Mark: require('./Mark'),
    Head: require('./Head'),
    Grade: require('./Grade'),
}