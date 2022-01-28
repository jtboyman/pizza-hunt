const { Pizza } = require('../models');

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
      Pizza.find({})
      .populate({//make it so we can see the comments in the field (like when we joined tables in SQL)
          path: 'comments', //value of the field to be populated
          select: '-__v' // - __v to say we dont wanna see __v
      })
      .select('-__v')
      .sort({_id: -1}) //sort in DESC order by _id value
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
          res.status(400).json(err);
      });
  },

  //get one pizza by id
  getPizzaById({params}, res) { //destructure params out of the req object bc dont need anything else
      Pizza.findOne({_id: params.id})
      .populate({
          path: 'comments',
          select: '-__v'
      })
      .select('-__v')
      .then(dbPizzaData => {
          //if no pizza found, send 404
          if (!dbPizzaData) {
              res.status(404).json({message: 'No pizza found with this id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => {
          console.log(err);
          res.status(400).json(err)
      });
  },

  //create a pizza
  createPizza({body}, res) { //destructure body out of the req object bc dont need anything else
      Pizza.create(body)
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => res.status(400).json(err));
  },

  //update pizza by id
  updatePizza({params, body}, res) {
      Pizza.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true}) //new: true returns the new version of the document instead of the original, run validators on update requests
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'No pizza found with this id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  },

  //delete pizza
  deletePizza({params}, res) {
      Pizza.findOneAndDelete({_id: params.id})
      .then(dbPizzaData => {
          if (!dbPizzaData) {
              res.status(404).json({message: 'No pizza found with this id!'});
              return;
          }
          res.json(dbPizzaData);
      })
      .catch(err => res.status(400).json(err));
  }
};

module.exports = pizzaController;