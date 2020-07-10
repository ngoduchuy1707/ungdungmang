var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var producerSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        image_prod: {
            type: String,
        },
        categoryId: Schema.ObjectId,
    },
    {
        collection: 'producer'
    }
);

module.exports = mongoose.model('Producer', producerSchema);
  