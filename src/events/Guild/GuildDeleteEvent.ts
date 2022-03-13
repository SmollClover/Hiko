import { Guild } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client, guild: Guild) => {
	const guildId = guild.id;

	const SettingsSchema = await client.db.load('settings');
	const ChannelsSchema = await client.db.load('channels');
	const TicketsSchema = await client.db.load('tickets');

	await SettingsSchema.delete({ Guild: guildId });
	while (await ChannelsSchema.delete({ Guild: guildId })) {}
	while (await TicketsSchema.delete({ Guild: guildId })) {}
};

export const name: string = 'guildDelete';
