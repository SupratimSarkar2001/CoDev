const express = require("express");

const app = express();
const PORT = 8080;

/*Start the server*/
app.listen(PORT,()=>{
 console.log(`Server is up on port ${PORT}`);
})

/*Health Check Endpoint*/
app.get("/health-check",(req,res)=>{
 res.send("Healthy Response");
})

/*Playground Endpoints*/
app.get("/ab+c", (req, res) => {
 res.send("Expected Result: Response will be fetched with abbbbbbbbc");
})

app.get("/ef*g",(req,res)=>{
 res.send("Expected Result: Response will be fetched with efANYTHINGg");
})

app.get("/hi?j", (req, res) => {
 res.send("Expected Result: Response will be fetched with hj,hij");
})

app.get("/k(lm)+n",(req,res)=>{
 res.send("Expected Result: Response will be fetched with klmlmlmn");
})

app.get(/abcz/,(req,res)=>{
 res.send("Expected Result: Response will be fetched with anything with abcz in it - A Regex");
})

app.get("/query",(req,res)=>{
 const query = req.query;
 console.log(query);
 res.send(`You asked for ${query}`)
})

app.get("/dynamic-route/:id/:name", (req, res) => {
 const params = req.params;
 console.log(params);
 res.send(`You asked for ${params.id} and ${params.name}`);
})