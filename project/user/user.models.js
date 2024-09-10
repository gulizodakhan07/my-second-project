import { Schema, model } from "mongoose";
const userSchema = new Schema({
    first_name: {
        type: String,
        required: true

    },
    last_name: {
        type: String,
        required: false
    },
    phone_number: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        enum: ["admin","super-admin","user"]
        
    }
},
{
    timestamps: true
}
)
export const User = model("user",userSchema)