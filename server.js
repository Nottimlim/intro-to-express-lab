// Constants
const express = require('express');
const app = express();
const port = 3000;
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];  

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];


// Routes 

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username; // Extract the username parameter from the URL
    const greetingMessage = `What's good ${username}!`; // Create a greeting message using the username
    res.send(greetingMessage); // Send the greeting message as the response
  });

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number); // Convert the parameter to an integer
    if (isNaN(number)) { // Check if the parameter is not a number
      res.send('Specify a number'); // Respond with an error message
    } else {
      const rolledNumber = Math.floor(Math.random() * (number + 1)); // Generate a random number between 0 and the given number
      res.send(`You rolled a ${rolledNumber}.`); // Respond with the rolled number
    }
  });

  app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10); // Convert the parameter to an integer
    if (index >= 0 && index < collectibles.length) { // Check if the index is valid
      const item = collectibles[index]; // Get the item at the specified index
      res.send(`So, you want the ${item.name}? I might fuck around and give it away for like.. ${item.price}. `); // Respond with the item details.
    } else {
      res.send("I aint got that fucking shit. Pull up another time. "); // Respond with an message.
    }
  });

app.get('/shoes', (req, res) => {
  let filteredShoes = shoes; // Start with the full list of shoes
  if (req.query['min-price']) { // Check if the min-price query parameter is provided
    const minPrice = parseFloat(req.query['min-price']); // Convert the query parameter to a float
    filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice); // Filter shoes by minimum price
  }
  if (req.query['max-price']) { // Check if the max-price query parameter is provided
    const maxPrice = parseFloat(req.query['max-price']); // Convert the query parameter to a float
    filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice); // Filter shoes by maximum price
  }
  if (req.query.type) { // Check if the type query parameter is provided
    const type = req.query.type; // Get the type query parameter
    filteredShoes = filteredShoes.filter(shoe => shoe.type === type); // Filter shoes by type
  }
  const responseText = filteredShoes.map(shoe => `Name: ${shoe.name}, Price: ${shoe.price}, Type: ${shoe.type}`).join('\n'); // Format the filtered shoes into a readable string
  res.send(responseText); // Respond with the formatted string
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});