module.exports = {
    Query:{
       students: (parent, args, { db }, info)=>{
            return db.Student.find().sort({ regno: 1 });
       },
       marks: (parent, args, { db }, info)=>{
            return db.Mark.find().sort({ hid: 1 });;
       },
       heads: (parent, args, { db }, info)=>{
            return db.Head.find().sort({ hid: 1 });
       },
       grades: (parent, args, { db }, info)=>{
            return db.Grade.find().sort({ gradeid: 1 });
       },
       student: (parent, args, { db }, info)=>{
            console.log('resolver args :>> ', args);
            return db.Student.findOne({ regno: args.regno });
       },
    }, 
    Student: {
        marks:(parent, args, { db }, info)=>{
            return db.Mark.find({ regno: parent.regno }).sort({ hid: 1 });
       },
    },
    Mark: {
        student:(parent, args, { db }, info)=>{
            return db.Student.findOne({ regno: parent.regno });
       },
        head:(parent, args, { db }, info)=>{
            return db.Head.findOne({ hid: parent.hid });
       },
    }, 
    Mutation:{
     updatemarks: async (parent, args, { db }, info)=>{
          return await db.Mark.findOneAndUpdate({ hid: args.hid, regno: args.regno }, {
               $set:{
                    marks: args.mark
               } 
          },{new: true});
     },
    }
}
