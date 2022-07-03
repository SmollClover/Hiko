import { CommandInteraction, GuildMember } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Settings, Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	if (!(interaction.member as GuildMember).permissions.has('ADMINISTRATOR'))
		return interaction.reply({
			ephemeral: true,
			embeds: [client.errorEmbed({ description: '**Insufficient Permissions**\nAdministrator Permissions required!' })],
		});

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
		description: `**Log Channel:** <#${Settings.LogChannelId}>`,
		fields: [
			{
				name: 'Moderators',
				value:
					Settings.Moderators.length > 0
						? Settings.Moderators.map((value) => {
								return interaction.guild.roles.cache.get(value) ? `<@&${value}>` : `<@!${value}>`;
						  }).join(', ')
						: 'None',
			},
		],
	});

	Channels.forEach((channel) => {
		const data = [
			`<#${channel.Channel}>`,
			`Ticket Number: ${channel.Number}`,
			`Quote: ${channel.Quote}`,
			`Private: ${channel.Private}`,
			`Text: ${!!channel.Text}`,
			`Pings: ${channel.Pings.map((value) => {
				return interaction.guild.roles.cache.get(value) ? `<@&${value}>` : `<@!${value}>`;
			}).join(', ')}`,
		];

		embed.fields.push({
			name: `#${interaction.guild.channels.cache.get(channel.Channel).name}`,
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
