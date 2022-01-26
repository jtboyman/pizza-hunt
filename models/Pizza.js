const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const PizzaSchema = new Schema({
    pizzaName: {
      type: String
    },
    createdBy: {
      type: String
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal) //format date with getter
    },
    size: {
      type: String,
      default: 'Large'
    },
    toppings: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment' //tells Pizza model which doc to search to find the right comments
      }
    ]
  },
  { //tell it it can use virtuals, u also did this w/ a const up top per the documentation in a class assignment
    toJSON: {
      virtuals: true,
      getters: true //dont forget to allow getters
    },
    id: false
  }
  );

//get total count of comments and replies on retrieval (virtuals allow us to add more information to a database response so that we don't have to add in the information manually with a helper before responding to the API request.)
PizzaSchema.virtual('commentCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});
  // create the Pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);

// export the Pizza model
module.exports = Pizza;