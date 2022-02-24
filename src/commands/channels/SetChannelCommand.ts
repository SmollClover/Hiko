import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'channel';
export const description: string = 'Add / Remove a Channel from Ticket System';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'Channel',
		description: 'The Channel in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'Add / Remove',
		description: 'Whether to add or remove the User from the Ticket Channels. Leave empty to echo Channel Status.',
	},
];
