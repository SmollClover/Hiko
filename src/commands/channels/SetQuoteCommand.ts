import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'quote';
export const description: string = 'Enable / Disable the Quoting of the Users Message';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'BOOLEAN',
		name: 'true-or-false',
		description: 'Set whether to Quote the Users Message. Leave empty to echo current one.',
	},
];
