import { Guild } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client, guild: Guild) => {
	const SettingsSchema = await client.db.load('settings');

	await SettingsSchema.update(
		{ Guild: guild.id },
		{
			Guild: guild.id,
			Moderators: [],
			LogChannelId: '',
		}
	);
};

export const name: string = 'guildCreate';
