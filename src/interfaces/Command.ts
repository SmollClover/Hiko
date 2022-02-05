import { client } from '../client/Client';
import { Message } from 'discord.js';

export interface RunFunction {
	(client: client, message: Message, args: string[]): Promise<unknown>;
}

export interface Command {
	name: string;
	category: string;
	aliases?: string[];
	cooldown: number;
	run: RunFunction;
}
