import { ApplicationCommandOptionData, CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'moderator';
export const description: string = 'Add / Remove Ticket Moderators';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'USER',
		name: 'User',
		description: 'The User in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'Add or Remove',
		description: 'Whether to add or remove the User from the Ticket Moderators. Leave empty to echo Moderator Status.',
	},
];
