import { connect } from "nats.ws";
const NATS_URL = "wss://caseflow-natserver.aot-technologies.com";

export const publishMessage = async (SUBJECT, MESSAGE) => {
  try {
    MESSAGE = JSON.stringify(MESSAGE);
    const message = new TextEncoder().encode(MESSAGE);
    const nc = await connect({ servers: NATS_URL });
    console.log("Connected to NATS server");
    console.log(SUBJECT);
    nc.publish(SUBJECT, message);

    console.log(nc);
    console.log("Message published successfully");
  } catch (error) {
    console.error(`Error publishing message: ${error}`);
  }
};

export const subscribeToMessages = async (SUBJECT) => {
  try {
    const nc = await connect({ servers: NATS_URL });
    console.log("Connected to NATS server");
    const subscription = nc.subscribe(SUBJECT);
    console.log(subscription);
    for await (const msg of subscription) {
      console.log(`Received message: ${new TextDecoder().decode(msg.data)}`);
    }
  } catch (error) {
    console.error(`Error subscribing to messages: ${error}`);
  }
};
