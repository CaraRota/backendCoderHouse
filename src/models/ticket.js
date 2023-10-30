import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        ref: 'tickets',
    },
    code: {
        type: String,
        required: true,
    },
    purchase_datetime: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

const ticketModel = model("ticket", ticketSchema);

export default ticketModel;