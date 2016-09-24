var mqtt = require('mqtt'), url = require('url');
// Parse 
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');
var auth = (mqtt_url.auth || ':').split(':');
var url = "mqtt://" + mqtt_url.host;

var options = {
  port: mqtt_url.port,
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: auth[0],
  password: auth[1],
};

// Create a client connection
var client = mqtt.connect(url, options);

client.on('connect', function() { // When connected

  

  // publish a message to a topic (hello/world) and sends message(my message)
  //to subscriber of the topic
  client.publish('hello/world', 'my message', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
});
