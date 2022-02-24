import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'quote';
export const description: string = 'Enable / Disable the Quoting of the Users Message';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'Ticket Channel',
		description: 'The Ticket Channel in question.',
		required: true,
	},
	{
		type: 'BOOLEAN',
		name: 'True / False',
		description: 'Set whether to Quote the Users Message. Leave empty to echo current one.',
	},
];
