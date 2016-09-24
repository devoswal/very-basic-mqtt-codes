var mqtt = require('mqtt'), url = require('url');



//here url.parse contains the parsed properties of  the object string passed in the braces
var mqtt_url = url.parse(process.env.CLOUDMQTT_URL || 'mqtt://localhost:1883');


//auth consists of  username and a passwors which in this case is null. 
//the variable mqtt_url defined above has the parsed properties of the parameters of which auth 
//is a part. the split function splits the authentication string(null in this case)
var auth = (mqtt_url.auth || ':').split(':');
//concatenates the string with the host property of mqtt_url
var url = "mqtt://" + mqtt_url.host;

//object defined containing port number of mqtt_url, 
var options = {
	//object defined containing port number of mqtt_url,
  port: mqtt_url.port,
  //client id created by concatination of the srting and a random math function
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
 //i have no idea about auth[] but the code works just fine without them
  username: auth[0],
  password: auth[0],
};
// Create a client connection with parameters url and the entities of the object
var client = mqtt.connect(url, options);
//starts the connection
client.on('connect', function() { 
// When connected
// subscribe to a topic
  client.subscribe('hello/world', function() {
    // when a message arrives publishes the message 
    client.on('message', function(topic, message, packet) {
      console.log("Received '" + message + "' on '" + topic + "'");
    });
  });
});