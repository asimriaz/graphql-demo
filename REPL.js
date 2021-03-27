const mongoose = require('mongoose');
const db = require('./models');

(async()=>{
    let students = await db.Grade.find()
    console.log(students);
})();