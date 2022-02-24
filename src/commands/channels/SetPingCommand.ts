import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'ping';
export const description: string = 'Add / Remove Roles to be pinged on Ticket creation';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'Ticket Channel',
		description: 'The Ticket Channel in question.',
		required: true,
	},
	{
		type: 'USER',
		name: 'User',
		description: 'The User in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'Add / Remove',
		description: 'Whether to add or remove the User from the Ticket Pings. Leave empty to echo Ping Status.',
	},
];
