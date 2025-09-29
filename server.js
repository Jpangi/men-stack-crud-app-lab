const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();


/*--------MIDDLEWARE--------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


/*--------CONNECTIONS--------*/
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", ()=>{
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

const Planet = require('./models/planet')





app.get('/test', (req,res)=>{
    res.send('Test file sending')
})

app.get('/planets', async (req,res)=>{
    const allPlanets = await Planet.find();
    res.render('index.ejs', {planets: allPlanets})
})

app.get('/new', (req,res)=>{
    res.render('new.ejs')
})

app.post('/new', async(req,res)=>{
    console.log(req.body);
    await Planet.create(req.body)
    res.redirect('/planets')
})

app.get('/planets/:planetId', async (req,res)=>{
    const foundPlanet = await Planet.findById(req.params.planetId)
    console.log('SHOW PAGE:', foundPlanet);
    res.render('show.ejs', {planet: foundPlanet})
})

const PORT = 3000
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT ${PORT}`);
})