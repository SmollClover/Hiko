import dotenv from 'dotenv';
dotenv.config();

import { Client, Message, MessageEmbed, MessageEmbedOptions, Intents, Collection } from 'discord.js';
import consola, { Consola } from 'consola';
import { Database } from 'zapmongo';
import { promisify } from 'util';
import glob from 'glob';

import { Command } from '../interfaces/Command';
import { Event } from '../interfaces/Event';

const globPromise = promisify(glob);

class client extends Client {
	public db: Database;

	public logger: Consola = consola;
	public commands: Collection<string, Command> = new Collection();
	public aliases: Collection<string, string> = new Collection();
	public events: Collection<string, Event> = new Collection();
	public cooldowns: Collection<string, number> = new Collection();

	public constructor() {
		super({
			intents: [
				Intents.FLAGS.GUILDS,
				Intents.FLAGS.GUILD_MEMBERS,
				Intents.FLAGS.GUILD_MESSAGES,
				Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
				Intents.FLAGS.GUILD_INTEGRATIONS,
			],
		});
	}

	public async start(TOKEN: string): Promise<void> {
		if (!process.env.PROD) this.logger.info('Development mode active');

		this.login(TOKEN);

		const commandFiles: string[] = await globPromise(`${__dirname}/../commands/*{.ts,.js}`);
		commandFiles.map(async (value: string) => {
			const file: Command = await import(value);
			this.commands.set(file.name, {
				...file,
			});
		});

		const eventFiles: string[] = await globPromise(`${__dirname}/../events/**/*{.ts,.js}`);
		eventFiles.map(async (value: string) => {
			const file: Event = await import(value);
			this.events.set(file.name, file);

			this.on(file.name, file.run.bind(undefined, this));
		});

		this.db = new Database({
			mongoURI: process.env.MONGO_URI,
			schemas: [
				{
					name: 'settings',
					data: {
						guild: Number,
						moderators: Array,
					},
				},
				{
					name: 'channels',
					data: {
						guild: Number,
						channel: Number,
						quote: Boolean,
						pings: Array,
						text: String,
					},
				},
				{
					name: 'tickets',
					data: {
						guild: Number,
						channel: Number,
						number: Number,
						message: String,
						creator: Number,
						createdAt: Number,
						closedAt: Number,
					},
				},
			],
		});
	}

	public embed(options: MessageEmbedOptions): MessageEmbed {
		return new MessageEmbed({ ...options }).setColor('#5865F2');
	}

	public errorEmbed(options: MessageEmbedOptions): MessageEmbed {
		return new MessageEmbed({ ...options }).setColor('#FF0000').setTimestamp();
	}
}

export { client };
