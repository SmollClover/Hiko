import { CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'channel';
export const description: string = 'Add / Remove a Channel from Ticket System';
