import { Schema, Types } from "mongoose";

export const VideoSchema = new Schema({
    fileName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    likes: {
        count: {
            type: Number,
            default: 0
        },
        userIds: {
            type: [Types.ObjectId]
        }
    },
    comments: [{
        userId: {
            type: Types.ObjectId
        },
        text: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now()
        }
    }],
    userId: {
        type: Types.ObjectId,
        required: true
    }
},
{
    timestamps: true
});