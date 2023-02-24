import { defineStore } from "pinia";
import mqtt from "mqtt";
import useNotify from "src/composable/UseNotify";

const { notifyDager } = useNotify();
const receive = "/owtech/home/acj/payload/app";

const options = {
  qos: 0,
  retain: false,
  port: "xxxx",
  clientId: "owtech_" + Math.random().toString(16).substring(2, 8),
  username: "teste",
  password: "1234567890",
};

let client = mqtt.connect("ws://umaurlqualquer.com", options);
client.subscribe(receive);

export const useMqttStore = defineStore("mqtt", {
  state: () => ({
    payload: {},
  }),
  actions: {
    useMqtt() {
      client.on("message", (_, message) => {
        this.payload = JSON.parse(message);
      });
    },
    usePublish(topic, msg) {
      client.publish(topic, msg, { qos: 0, retain: false }, (error) => {
        if (error) {
          notifyDager(error);
        }
      });
    },
  },
});
