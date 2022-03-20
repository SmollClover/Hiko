import { Message, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Tickets, Settings } from '../../interfaces/DB';

export const run: RunFunction = async (client, msg: Message) => {
	if (!msg.guild || msg.author.bot) return;
	const thread = msg?.thread;

	const SettingsSchema = await client.db.load('settings');
	const TicketsSchema = await client.db.load('tickets');
	const Settings = (await SettingsSchema.findOne({ Guild: msg.guild.id })) as Settings;
	const Ticket = (await TicketsSchema.findOne({
		Guild: msg.guild.id,
		Ticket: msg.id,
		ClosedAt: 0,
	})) as Tickets;

	if (!Ticket || !thread || thread.archived) return;

	await thread.send({ embeds: [client.embed({ description: '**Closing Ticket since Author deleted his Message**' })] });

	await thread.setLocked(true, 'Hiko | Ticket closed since Author deleted his Message');
	await thread.setArchived(true);

	const date = new Date();
	Ticket.ClosedAt = date.getTime();
	await TicketsSchema.update(
		{
			Guild: msg.guild.id,
			Ticket: msg.id,
		},
		{ ...Ticket }
	);

	try {
		const logChannel = await msg.guild.channels.fetch(Settings.LogChannelId, { force: true });
		if (!logChannel || !(logChannel instanceof TextChannel)) return;

		logChannel.send({
			embeds: [
				client.cleanEmbed({
					title: 'Ticket Message Deleted',
					fields: [
						{ name: 'User', value: `<@${msg.author.id}>`, inline: true },
						{ name: 'Number', value: Ticket.Number.toString(), inline: true },
						{ name: 'Channel', value: `<#${Ticket.Channel}>`, inline: true },
						{ name: 'Message', value: Ticket.Message },
					],
					color: '#EAE450',
					timestamp: date.getTime(),
				}),
			],
		});
	} catch {}
};

export const name: string = 'messageDelete';
