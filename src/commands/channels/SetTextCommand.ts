import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'text';
export const description: string = 'Set / Echo the Text for the Ticket';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'Ticket Channel',
		description: 'The Ticket Channel in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'Text',
		description: 'Set the Text of the Ticket Channel. Leave empty to disable.',
	},
];
