import mongoose from "mongoose";


// User Schema 
const userSchema = new mongoose.Schema(
    {
        email:{
            type:String,
            require:true,
            unique:true
        },
        fullName:{
            type:String,
            require:true
        },
        profession:{
            type:String,
            require:true
        },
        username:{
            type:String,
            default:""
        },
        skills:{
            type:Array,
            default:[]
        },
        category:{
            type:String,
            default:""
        },
        profilePic:{
            type:String,
            default:""
        },
        completeProfile:{
            type:Boolean,
            default:false
        },
        country:{
            type:Object,
            default:{}
        },
        followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
        friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],

    },
    {
        timestamps:true
    }
)

// User Model 
// Remember : model should me noun singular and first later should be Capital.
const User = mongoose.model("User", userSchema);

export default User;


