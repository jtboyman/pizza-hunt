const { Pizza } = require('../models');

const pizzaController = {
  // get all pizzas
  getAllPizza(req, res) {
      Pizza.find({})
      .then(dbPizzaData => res.json(dbPizzaData))
      .catch(err => {
          res.status(400).json(err);
      });
  },

  //get one pizza by id
  getPizzaById({params}, res) { //destructure params out of the req object bc dont need anything else
      Pizza.findOne({_id: params.id})
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
      Pizza.findOneAndUpdate({_id: params.id}, body, {new: true}) //new: true returns the new version of the document instead of the original
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