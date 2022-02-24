import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'ping';
export const description: string = 'Add or Remove Roles to be pinged on Ticket creation';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'USER',
		name: 'user',
		description: 'The User in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'add-or-remove',
		description: 'Whether to add or remove the User from the Ticket Pings. Leave empty to echo Ping Status.',
	},
];
