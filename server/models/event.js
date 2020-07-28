const { Schema, model } = require("mongoose");

const EventSchema = new Schema(
  {
    phone:{
      type : String, 
      required:true},
    start: {
      type: Date,
      required: true
    },
    end: {
      type: Date,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description :{
      type : String,
      required :true
    },
    backgroundColor:{
      type:String,
      required : false,
      default :'fff' 
    },
    usuario: { 
        type: Schema.Types.ObjectId, 
        ref: 'Usuario',
        required: true 
    }
  }
);

module.exports = model("Event", EventSchema);