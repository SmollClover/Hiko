import { ButtonInteraction, ThreadChannel } from 'discord.js';
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

	interaction.editReply({ embeds: [client.embed({ description: '**Closing Ticket**' })] });

	await thread.setLocked(
		true,
		'Hiko | Ticket closed by ' + Settings.Moderators.includes(user.user.id) ? 'Moderator' : 'User'
	);
	await thread.setArchived(true);

	Ticket.ClosedAt = date.getTime();
	return TicketsSchema.update(
		{
			Guild: interaction.guildId,
			Ticket: starterMessage.id,
		},
		{ ...Ticket }
	);
};

export const customId: string = 'close-ticket';
