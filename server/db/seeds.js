use seven_meals;
db.dropDatabase();

db.meals.insertMany([
  {
    "name": "Tacos",
    "image": "https://lovingitvegan.com/wp-content/uploads/2019/02/Vegan-Tacos-15.jpg",
    "instructions": "Do the cooking",
    "ingredients": {
      "tortillas": "6",
      "tomatoes": "5"
    }
  },
  {
    "name": "Spaghetti",
    "image": "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
    "instructions": "Do the cooking",
    "ingredients": {
      "spaghetti": "1",
      "tomatoes": "10"
    }
  }
]);

db.weeks.insertMany([
  {
  "name": "Week 1",
  "days": [
    {
      "name": "Tacos",
      "image": "https://lovingitvegan.com/wp-content/uploads/2019/02/Vegan-Tacos-15.jpg",
      "instructions": "Do the cooking",
      "ingredients": {
        "tortillas": "6",
        "tomatoes": "5"
      }
    },
    {
      "name": "Spaghetti",
      "image": "https://www.kitchensanctuary.com/wp-content/uploads/2019/09/Spaghetti-Bolognese-square-FS-0204.jpg",
      "instructions": "Do the cooking",
      "ingredients": {
        "spaghetti": "1",
        "tomatoes": "10"
      }
    }
  ]
}
]);

db.inventories.insertMany([
  {
  "name": "Main Inventory",
  "food": [
    {
      "tortillas": "10"
    },
    {
      "tomatoes": "1"
    }
  ]
}
])
