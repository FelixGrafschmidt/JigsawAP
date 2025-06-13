import type { BouncedPacket, ConnectedPacket, Item, JSONRecord, MessageNode } from 'archipelago.js';
import { Client } from 'archipelago.js';
import {consola} from 'consola';
import { skipHydrate } from "pinia";

export const useAPClient = defineStore('apClient', () => {
  const client = reactive<Client>(new Client());

  function receiveditemsListener(items: Item[], startingIndex: number) {
    consola.info('Items received from Archipelago server:', items, 'Starting index:', startingIndex);
  }
  function connectedListener(packet: ConnectedPacket) {
    consola.info('Connected to Archipelago server:', packet);
  }
  function disconnectedListener() {
    consola.info('Disconnected from Archipelago server');
  }
  function bouncedListener(packet: BouncedPacket, data: JSONRecord) {
    consola.info('Bounced packet received:', packet, 'Data:', data);
  }
  function jsonListener(text: string, nodes: MessageNode[]) {
    consola.info('JSON message received:', text, 'Nodes:', nodes);
  }
  async function login(hostport: string, name: string, game: string, password?: string) {
    // const c =
    //   // client.value ||
    //   new Client();
    // if (!client) {
    //   client = c
    //   initListeners();
    // }
    initListeners()
    try {
      await client.login(hostport, name, game, { password })
      consola.info('Successfully logged in to Archipelago server:', hostport);
    } catch (error) {
      console.error('Failed to connect to the server:', error);
      throw error;
    }
  }

  function initListeners() {
    client.items.on('itemsReceived', receiveditemsListener);
    client.socket.on('connected', connectedListener);
    client.socket.on('disconnected', disconnectedListener);
    client.socket.on('bounced', bouncedListener);
    client.messages.on('message', jsonListener);
  }

  return { client: skipHydrate(client), login }
});
