const WebSocket = require('ws');
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('Cliente WebSocket conectado');
  
    ws.on('message', (message) => {
      console.log(`Mensaje recibido: ${message}`);
    });
  
    ws.on('close', () => {
      console.log('Cliente WebSocket desconectado');
    });
  });
  
  module.exports = wss;
