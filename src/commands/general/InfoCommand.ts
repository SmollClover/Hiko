import { CommandInteraction } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Settings, Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const SettingsSchema = await client.db.load('settings');
	const ChannelsSchema = await client.db.load('channels');
	const Settings = (await SettingsSchema.findOne({ Guild: interaction.guildId })) as Settings;
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	if (!Settings) {
		await interaction.editReply({
			embeds: [
				client.fatalErrorEmbed({
					title: 'Error encountered',
					description:
						'Rolling back Settings to Default and emitting Guild Join Event.\nPlease try again, after the Bot has sent the standard Invitation Message.',
				}),
			],
		});

		return client.emit('guildCreate', interaction.guild);
	}

	const embed = client.embed({
		fields: [
			{
				name: 'Log Channel',
				value: `<#${Settings.LogChannelId}>`,
				inline: true,
			},
			{
				name: 'Moderators',
				value: Settings.Moderators.map((value) => {
					return `<@${value}>`;
				}).join(', '),
				inline: true,
			},
		],
	});

	Channels.forEach((channel) => {
		const data = [
			`Ticket Number: ${channel.Number}`,
			`Quote: ${channel.Quote}`,
			`Text: ${!!channel.Text}`,
			`Pings: ${channel.Pings.map((value) => {
				return `<@${value}>`;
			}).join(', ')}`,
		];

		embed.fields.push({
			name: `<#${channel.Channel}>`,
			value: data.join('\n'),
			inline: true,
		});
	});

	interaction.editReply({
		embeds: [embed],
	});
};

export const name: string = 'info';
export const description: string = 'Reply with general Information like Ticket Channels, etc.';