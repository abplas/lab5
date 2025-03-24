import express from 'express';
import fetch from 'node-fetch';
import path from "path";
import { fileURLToPath } from "url";
const planets = (await import('npm-solarsystem')).default;
const date = new Date();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
let url = "https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=solar%20system&per_page=50&orientation=horizontal";
let response = await fetch(url);
let data = await response.json();
let size = Object.keys(data.hits).length;
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use('/public', express.static('public'));


app.get('/', (req, res) => {  
    let rand = Math.floor(Math.random() * size);
    res.render('home',
        {
            img:data.hits[rand].largeImageURL
        }
    );
});
app.get('/nasaToday', async (req, res) => {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let tday = year + "-" + month + "-" + day;
    let url2 = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${tday}`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    res.render('nasa',
        {
            nasa:data2
        });
});
app.get('/nasaAny', async (req, res) => {
    let day = req.query.day;
    let month = req.query.month;
    let year = req.query.year;
    let tday = year + "-" + month + "-" + day;
    let url2 = `https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date=${tday}`;
    let response2 = await fetch(url2);
    let data2 = await response2.json();
    res.render('nasa',
        {
            nasa:data2
        });
});
app.get('/PlanetInfo', (req, res) => {  
    let planetSelect = req.query.planet;
    let planetInfo;
    switch(planetSelect) {
        case "Mercury":
            planetInfo = planets.getMercury();
            break;
        case "Venus":
            planetInfo = planets.getVenus();
            break;
        case "Earth":
            planetInfo = planets.getEarth();
            break;
        case "Mars":
            planetInfo = planets.getMars();
            break;
        case "Jupiter":
            planetInfo = planets.getJupiter();
            break;
        case "Saturn":
            planetInfo = planets.getSaturn();
            break;
        case "Uranus":
            planetInfo = planets.getUranus();
            break;
        case "Neptune":
            planetInfo = planets.getNeptune();
            break;
        default:
            break;
      }
    res.render('planetInfo',
        {
            planet:planetInfo,
            name:planetSelect
        });
}); 
app.get('/SpaceInfo', (req, res) => {  
    let nameSelect = req.query.Obj;
    let nameInfo;
    if(nameSelect == "Comets")
    {
        nameInfo = planets.getComets();
    }
    else
    {
        nameInfo = planets.getAsteroids();
    }
    res.render('space',
        {
            info:nameInfo,
            name:nameSelect
        }
    )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});

export default app;
