import { CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {};

export const name: string = 'quote';
export const description: string = 'Enable / Disable the Quoting of the Users Message';
