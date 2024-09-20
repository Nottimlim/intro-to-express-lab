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

app.get('/greetings/:username' , (req, res) => {
    const username = req.params.username;
    const greetingMessage = `What's good ${username}!`;
    res.send(greetingMessage);
});

app.get('/roll/:number', (req, res) => {
    const number = parseInt(req.params.number);
    if (isNaN(number)) {
        res.send('Specify a number');
    } else {
        const rolledNumber = Math.floor(Math.random() * (number + 1));
        res.send(`You rolled a ${rolledNumber}.`);
    }
    });

app.get('/collectibles/:index', (req, res) => {
    const index = parseInt(req.params.index, 10);
    if (index >= 0 && index < collectibles.length) {
        const item = collectibles[index];
        res.send(`So, you want the ${item.name}? I might fuck around and give it away for like.. ${item.price}. `);
    } else {
        res.send("I aint got that fucking shit. Pull up another time. ");
    }
    });

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
    if (req.query['min-price']) {
        const minPrice = parseFloat(req.query['min-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
    if (req.query['max-price']) {
        const maxPrice = parseFloat(req.query['max-price']);
        filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
    if (req.query.type) {
        const type = req.query.type;
        filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
    const responseText = filteredShoes.map(shoe => `Name: ${shoe.name}, Price: ${shoe.price}, Type: ${shoe.type}`).join('\n');
    res.send(responseText);
    });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});