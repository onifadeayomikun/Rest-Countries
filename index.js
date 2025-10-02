import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.get("/info", async (req, res) => {
    const name = req.query.name;
   try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    res.render("index.ejs", {
        officialName: response.data[0].name.official,
        countryName: JSON.stringify(response.data[0].name.nativeName),
        capital: response.data[0].capital,
        language: JSON.stringify(response.data[0].languages),
        borders: response.data[0].borders,
        population: response.data[0].population
    });
   } catch (error) {
     res.render("index.ejs", { 
        error: "Not Found, Status: 404,  Check Spelling"
      });
   } 
});

app.listen(port, () => {
    console.log(`Server running on Port ${port}`);
});