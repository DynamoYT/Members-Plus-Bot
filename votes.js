const express = require('express'), {post, get} = require('superagent'), app = express();
app.use(express.json()); 
const db = require("quick.db");
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
})
app.post('/dblhook', async (req, res) => {
    let auth = req.headers['authorization'];
    if(!auth) return res.json({status: "Failed", message: `You didn't provide a 'Authorization' header!`});
    if(auth !== "WEBHOOK PASSWORD") return res.json({status: "Failed", message: `You didn't provide the correct authorization key!`});
    if(!req.body) return res.json({status: "Failed", message: `You didn't provide any data!`});
    if(!"DBL TOKEN") {
      console.log(`You didn't add your dbl api key in the .env file.. smh`)
      return res.status(401).json({status: false, message: `Unauthorized`})
    }
let user = req.body.user,
bot = req.body.bot;
let logs = await db.fetch(`logs_${user}`)
if (logs === null) logs = []
logs.unshift(`[+1] - Voted Users+ Bot in Discord Bot List.`)
db.set(`logs_${user}`, logs) 
db.add(`coins_${user}`, 1)
     
});
app.listen(60002, () => console.log(`Listening on port 60002`));
