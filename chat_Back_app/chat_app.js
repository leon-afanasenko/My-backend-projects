const EventEmitter = require("events");
const chatEmitter = new EventEmitter();

function sendMessage(username, message, emitter) {
  emitter.emit("message", username, message);
}

chatEmitter.on("message", (username, message) => {
  console.log(`${username}: ${message}`);
});

sendMessage("Alice", "Hello everyone!", chatEmitter);
sendMessage("Bob", "Hi Alice!", chatEmitter);
sendMessage("Charlie", "Good to see you both!", chatEmitter);
