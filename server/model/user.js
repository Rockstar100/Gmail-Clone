import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // required: [true, 'Please add a name'],
        
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        // unique: true,
    },
    password:{
        type: String,
        required: [true, 'Please add a password'],
    },
    profie_pic :{
        type : String,
       
    },
    notification : {
        type: Array,
        default: [],
    },
    seennotification : {
        type: Array,
        default: [],
    },
  
}, {timestamps: true})
const user = mongoose.model('users', userSchema);
export default user;
