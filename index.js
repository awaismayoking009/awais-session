const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("AWAIS MANO CYBER BACKEND RUNNING");
});

app.get("/pair", (req, res) => {
  res.json({
    success: true,
    message: "Backend theek chal raha hai",
    owner: "AWAIS Mayo",
    bot: "AWAIS MANO CYBER BOT"
  });
});

app.listen(process.env.PORT || 3000);
