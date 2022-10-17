const WebSocketServer = require('ws');

// Creating a new websocket server on port 5000
const PORT = 5000;
const wss = new WebSocketServer.Server({ port: PORT });

wss.on('connection', (ws) => {
  ws.onmessage = ({ data }) => {
    console.log(`server receive your message ${data}`);
    //broadcast all message except sender
    wss.clients.forEach(function each(client) {
      console.log('isWS', client === ws);
      console.log('readyState', client.readyState);
      console.log('openState', WebSocketServer.OPEN);
      if (client !== ws && client.readyState === WebSocketServer.OPEN) {
        console.log('send data');
        client.send(`${data}`);
      }
      console.log('=============================');
    });
  };
  ws.onclose = () => {
    console.log(`Client has disconnected!`);
  };
  ws.onerror = () => {
    console.log('Some Error occurred');
  };
});
console.log(`The WebSocket server is running on port ${PORT}`);
