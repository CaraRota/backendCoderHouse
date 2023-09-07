import { Schema, model } from "mongoose";

const cartSchema = new Schema({
    products: {
        type: [
            {
                id_prod: {
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
});

cartSchema.pre('findOne', function () {
    this.populate('products.id_prod');
});

const cartsModel = model("carts", cartSchema);

export default cartsModel