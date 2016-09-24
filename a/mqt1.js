client = new MqttClient("tcp://localhost:1883", "pahomqttpublish1");
client.connect();
MqttMessage message = new MqttMessage();
message.setPayload("A single message".getBytes());
client.publish("pahodemo/test", message);
client.disconnect();