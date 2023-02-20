import mongoose from 'mongoose';

const cartSchema = mongoose.Schema({
    products: { type: [String], required: true},
})

export default cartSchema;