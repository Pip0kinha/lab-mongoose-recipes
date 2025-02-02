const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    let recipe1 = {
      title: "Bolo de Banana",
      level: "Easy Peasy",
      ingredients: ["banana", "farinha", "ovos"],
      cuisine: "brasileira",
      dishType: "dessert",
      duration: 10,
      creator: "Leticia",
    };
    Recipe.create(recipe1)
      .then((newRecipe) => console.log(`created new recipe: ${newRecipe}`))
      .catch(() => {
        console.log("error while creating the first recipe");
      });
  })
  .then(() => {
    Recipe.insertMany(data)
      .then((newRecipes) => {
        newRecipes.forEach((recipe) => {
          console.log(`created new recipe: ${recipe.title}`);
        });
      })
      .then(() => {
        Recipe.findOneAndUpdate(
          { title: "Rigatoni alla Genovese" },
          { duration: 100 }
        )
          .then(() => console.log("sucessful update"))
          .catch((err) => console.log(err));
      })
      .then(() => {
        Recipe.deleteOne(
          { title: "Carrot Cake" }
          )
          .then(() => console.log("sucessful delete"))
      });
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
  mongoose.disconnect(() => console.log("disconected"));
