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

	try {
		await guild.systemChannel.send({
			embeds: [
				client.embed({
					title: 'Hiko | The Simple Ticket Managing Bot',
					description:
						'You need to configure this Bot first, to make it work.\nPlease use `/` to execute the configuration Commands.',
					footer: {
						text: 'Administrative Privileges are required!',
					},
					timestamp: new Date(),
				}),
			],
		});
	} catch {}
};

export const name: string = 'guildCreate';
