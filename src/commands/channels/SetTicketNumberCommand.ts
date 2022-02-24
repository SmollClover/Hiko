import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'number';
export const description: string = 'Set / Echo the next Ticket Number';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'NUMBER',
		name: 'number',
		description: 'Set the Ticket Number to this one. Leave empty to echo current one.',
	},
];
