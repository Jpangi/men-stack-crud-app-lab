const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const app = express();
const methodOverride = require("method-override");

/*--------MIDDLEWARE--------*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride("_method"));

/*--------CONNECTIONS--------*/
mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on("connected", ()=>{
    console.log(`connected to MongoDB ${mongoose.connection.name}`);
})

const Planet = require('./models/planet')



/*--------ROUTES--------*/

app.get('/test', (req,res)=>{
    res.send('Test file sending')
})

// homepage
app.get('/planets', async (req,res)=>{
    const allPlanets = await Planet.find();
    res.render('index.ejs', {planets: allPlanets})
})
// create new (POST ROUTE)
app.get('/new', (req,res)=>{
    res.render('new.ejs')
})

app.post('/new', async(req,res)=>{
try {
    console.log(req.body);
    await Planet.create(req.body)
    res.redirect('/planets')
} catch (error) {
    console.log('error in post route', error);
}


})

// show individual planets (SHOW PAGE)
app.get("/planets/:planetId", async (req, res) => {
  try {
    const foundPlanet = await Planet.findById(req.params.planetId);
    console.log("SHOW PAGE:", foundPlanet);
    res.render("show.ejs", { planet: foundPlanet });
  } catch (error) {
    console.log('error in show page route', error);
  }
});


// delete route from show page
app.delete('/planets/:planetId', async (req, res)=>{
    await Planet.findByIdAndDelete(req.params.planetId)
    res.redirect('/planets')
})


// Edit Route
app.get("/planets/:planetId/edit", async (req, res) => {
  try {
    const foundPlanet = await Planet.findById(req.params.planetId);
    console.log("EDIT SHOW PAGE:", foundPlanet);
    res.render("./planet/edit.ejs", { planet: foundPlanet });
  } catch (error) {
    console.log('error in edit page route', error);
  }
});

app.put('/planets/:planetId', async (req, res) => {
    try {
        console.log("Updating planet with data:", req.body); // debug
        await Planet.findByIdAndUpdate(req.params.planetId, req.body, { new: true });
        res.redirect(`/planets/${req.params.planetId}`);
    } catch (err) {
        console.log(err);
        console.log('error in edit page route', error);
    }
});







const PORT = 3000
app.listen(PORT, (req,res)=>{
    console.log(`Listening on PORT ${PORT}`);
})