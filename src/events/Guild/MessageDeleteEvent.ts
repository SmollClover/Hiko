import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Tickets } from '../../interfaces/DB';

export const run: RunFunction = async (client, msg: Message) => {
	if (!msg.guild || msg.author.bot) return;
	const thread = msg?.thread;

	const TicketsSchema = await client.db.load('tickets');
	const Ticket = (await TicketsSchema.findOne({
		Guild: msg.guild.id,
		Ticket: msg.id,
		ClosedAt: 0,
	})) as Tickets;

	if (!Ticket || !thread) return;

	await thread.send({ embeds: [client.embed({ description: '**Closing Ticket since Author deleted his Message**' })] });

	await thread.setLocked(true, 'Hiko | Ticket closed since Author deleted his Message');
	await thread.setArchived(true);

	const date = new Date();
	Ticket.ClosedAt = date.getTime();
	return TicketsSchema.update(
		{
			Guild: msg.guild.id,
			Ticket: msg.id,
		},
		{ ...Ticket }
	);
};

export const name: string = 'messageDelete';
