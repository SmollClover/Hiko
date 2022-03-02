import { ButtonInteraction, TextChannel, ThreadChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Button';
import { Settings, Tickets } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: ButtonInteraction) => {
	await interaction.deferReply({ ephemeral: true });

	const thread = interaction.channel;
	if (!(thread instanceof ThreadChannel)) return;
	const starterMessage = await thread.fetchStarterMessage({ force: true });

	const SettingsSchema = await client.db.load('settings');
	const TicketsSchema = await client.db.load('tickets');
	const Settings = (await SettingsSchema.findOne({ Guild: interaction.guildId })) as Settings;
	const Ticket = (await TicketsSchema.findOne({
		Guild: interaction.guildId,
		Ticket: starterMessage.id,
	})) as Tickets;

	const user = interaction.member;

	if (!Ticket) return;
	if (!(Settings.Moderators.includes(user.user.id) || Ticket.Creator === user.user.id))
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: "**You're not allowed to close this Ticket!**" })],
		});

	const date = new Date();

	await interaction.editReply({ embeds: [client.embed({ description: '**Closing Ticket...**' })] });
	await thread.send({ embeds: [client.embed({ description: `**Ticket closed by ${user.user.username}**` })] });

	await thread.setLocked(true, `Hiko | Ticket closed by ${user.user.username}`);
	await thread.setArchived(true);

	Ticket.ClosedAt = date.getTime();
	await TicketsSchema.update(
		{
			Guild: interaction.guildId,
			Ticket: starterMessage.id,
		},
		{ ...Ticket }
	);

	try {
		const logChannel = await interaction.guild.channels.fetch(Settings.LogChannelId, { force: true });
		if (!logChannel || !(logChannel instanceof TextChannel)) return;

		logChannel.send({
			embeds: [
				client.cleanEmbed({
					title: 'Ticket Closed',
					fields: [
						{ name: 'Closed by', value: `<@${interaction.user.id}>`, inline: true },
						{ name: 'Number', value: Ticket.Number.toString(), inline: true },
						{ name: 'Channel', value: `<#${Ticket.Channel}>`, inline: true },
					],
					color: '#EA5071',
					timestamp: date.getTime(),
				}),
			],
		});
	} catch {}
};

export const customId: string = 'close-ticket';
