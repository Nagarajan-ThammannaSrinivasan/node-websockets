'use strict';

const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
});

// setInterval(() => {
//   wss.clients.forEach((client) => {
//     client.send(new Date().toTimeString());
//   });
// }, 1000);

 server.use(express.urlencoded({
    extended: true
  }));

server.use(express.json())

 server.post('/postLocation',  (req, res) =>{
    console.log(req.body)
    res.end(JSON.stringify(req.body))
    
    wss.clients.forEach(client =>{        
        client.send(JSON.stringify(req.body))
    })
})
