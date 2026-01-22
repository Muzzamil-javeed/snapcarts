import mongoose from "mongoose";

interface IUser {
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password?: string
    phone?: string
    role: "user" | "admin" | "deliveryBoy"
    image?: string
}

const userSchema = new mongoose.Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    image: {
        type: String
    },
    role: {
        type: String,
        enum: ["user", "admin", 'deliveryBoy'],
        default: "user"
    }
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema)
export default User