import { CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'number';
export const description: string = 'Set / Echo the next Ticket Number';
