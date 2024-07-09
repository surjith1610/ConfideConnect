import mongoose from "mongoose";

const { Schema } = mongoose;

const ResetTokenSchema = new Schema({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }, 
    expiryAt: {
        type: Date,
        default: () => Date.now() + process.env.RESET_TOKEN_EXPIRATION_SECONDS * 1000
    },
    token: {
        type: String,
        required: true
    }
});

const ResetTokenModel = mongoose.model('ResetToken', ResetTokenSchema);

export default ResetTokenModel;