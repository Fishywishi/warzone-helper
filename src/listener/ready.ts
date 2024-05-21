import { DABFClient, Listener } from 'dabf';
import { Events } from 'discord.js';

export class ReadyListener extends Listener {
	id = 'ready';
	event = Events.ClientReady;

	constructor(public client: DABFClient) {
		super();
	}

	run() {
		this.client.log.info(`Logged in as ${this.client.user?.tag}`);
	}
}
