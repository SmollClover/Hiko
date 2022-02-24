import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'channel';
export const description: string = 'Add or Remove a Channel from Ticket System';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'channel',
		description: 'The Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'STRING',
		name: 'add-or-remove',
		description: 'Whether to add or remove the User from the Ticket Channels. Leave empty to echo Channel Status.',
	},
];
