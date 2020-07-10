var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var billSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        info: {
            type: Object,
            require: true,
        },
        address: {
            type: String,
            require: true,
        },
        phone: {
            type: Number,
            require: true,
        },
        Create_date: {
            type: Date,
            default: Date.now,
        },
        // status: {
        //     type: [
        //         {
        //             type: String,
        //             enum: ['a', 'b'],
        //         },
        //     ],
        //     default: ['available'],
        // },
        productId: Schema.ObjectId,
    },
    { collection: "Bill" }
);

module.exports = mongoose.model("Bill", billSchema);
