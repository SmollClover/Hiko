import { CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'ping';
export const description: string = 'Add / Remove Roles to be pinged on Ticket creation';
