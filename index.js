const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

const express = require("express");
const app = express();

let sock;

async function startSock() {
  const { state, saveCreds } =
    await useMultiFileAuthState("session");

  sock = makeWASocket({
    auth: state,
    printQRInTerminal: false
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (u) => {
    if (u.connection === "open") {
      console.log("✅ WhatsApp Connected");
    }
  });
}

app.get("/", (req, res) => {
  res.send("AWAIS MANO CYBER BACKEND RUNNING");
});

app.get("/pair", async (req, res) => {
  try {
    if (!sock) await startSock();

    const number = req.query.number;
    const code = await sock.requestPairingCode(number);

    res.json({
      success: true,
      pairingCode: code,
      owner: "AWAIS Mayo",
      bot: "AWAIS MANO CYBER BOT"
    });
  } catch (e) {
    res.json({
      success: false,
      error: "Try again after some time"
    });
  }
});

app.listen(process.env.PORT || 3000);
