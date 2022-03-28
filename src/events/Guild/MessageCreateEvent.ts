import { Message, MessageActionRow, MessageButton, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Settings, Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, msg: Message) => {
	if (!msg.guild || msg.author.bot) return;

	const SettingsSchema = await client.db.load('settings');
	const ChannelsSchema = await client.db.load('channels');
	const TicketsSchema = await client.db.load('tickets');
	const Settings = (await SettingsSchema.findOne({ Guild: msg.guild.id })) as Settings;
	const Channels = (await ChannelsSchema.find({ Guild: msg.guild.id })) as Array<Channels>;

	const channel = Channels.find((c) => c.Channel === msg.channel.id);

	if (Settings.Moderators.includes(msg.author.id) || !channel) return;

	if (channel.Private && msg.guild.premiumTier.match(/TIER_[2-3]/)) {
		(msg.channel as TextChannel).threads
			.create({
				name: `Ticket Nr. ${channel.Number}`,
				reason: 'Hiko | Received Message in Ticket Channel',
				type: 'GUILD_PRIVATE_THREAD',
			})
			.then(async (thread) => {
				const date = new Date();
				const messageContent = msg.content ? msg.content : 'No Message Content provided';

				const ticket = {
					Guild: msg.guild.id,
					Channel: msg.channel.id,
					Ticket: msg.id,
					Number: channel.Number,
					Message: messageContent,
					Creator: msg.author.id,
					CreatedAt: date.getTime(),
					ClosedAt: 0,
				};

				channel.Number += 1;
				await TicketsSchema.create(ticket);
				await ChannelsSchema.update({ Channel: channel.Channel }, { ...channel });
				channel.Pings.unshift(ticket.Creator);

				const content = channel.Pings.map((value) => {
					return msg.guild.roles.cache.get(value) ? `<@&${value}>` : `<@!${value}>`;
				}).join(', ');
				const embeds = [
					client.embed({
						title: `Ticket Nr. ${ticket.Number}`,
						fields: [
							{
								name: 'Author',
								value: `<@!${ticket.Creator}>`,
							},
						],
					}),
				];
				const components = [
					new MessageActionRow().addComponents(
						new MessageButton().setLabel('Close Ticket').setStyle('DANGER').setCustomId(`close-ticket`)
					),
				];

				if (channel.Quote) embeds[0].fields.push({ name: 'Message', value: ticket.Message, inline: false });
				if (channel.Text) embeds[0].fields.push({ name: 'Please read', value: channel.Text, inline: false });

				const messagePayload = content ? { content, embeds, components } : { embeds, components };
				await thread.send(messagePayload);

				msg.delete;

				try {
					const logChannel = await msg.guild.channels.fetch(Settings.LogChannelId, { force: true });
					if (!logChannel || !(logChannel instanceof TextChannel)) return;

					logChannel.send({
						embeds: [
							client.cleanEmbed({
								title: 'Ticket Created',
								fields: [
									{ name: 'User', value: `<@!${ticket.Creator}>`, inline: true },
									{ name: 'Number', value: ticket.Number.toString(), inline: true },
									{ name: 'Channel', value: `<#${ticket.Channel}>`, inline: true },
									{ name: 'Message', value: ticket.Message },
								],
								color: '#7BEA50',
								timestamp: date.getTime(),
							}),
						],
					});
				} catch {}
			});
	} else {
		msg.startThread({
			name: `Ticket Nr. ${channel.Number}`,
			reason: 'Hiko | Received Message in Ticket Channel',
		}).then(async (thread) => {
			const date = new Date();
			const messageContent = msg.content ? msg.content : 'No Message Content provided';

			const ticket = {
				Guild: msg.guild.id,
				Channel: msg.channel.id,
				Ticket: msg.id,
				Number: channel.Number,
				Message: messageContent,
				Creator: msg.author.id,
				CreatedAt: date.getTime(),
				ClosedAt: 0,
			};

			channel.Number += 1;
			await TicketsSchema.create(ticket);
			await ChannelsSchema.update({ Channel: channel.Channel }, { ...channel });
			channel.Pings.unshift(ticket.Creator);

			const content = channel.Pings.map((value) => {
				return msg.guild.roles.cache.get(value) ? `<@&${value}>` : `<@!${value}>`;
			}).join(', ');
			const embeds = [
				client.embed({
					title: `Ticket Nr. ${ticket.Number}`,
					fields: [
						{
							name: 'Author',
							value: `<@!${ticket.Creator}>`,
						},
					],
				}),
			];
			const components = [
				new MessageActionRow().addComponents(
					new MessageButton().setLabel('Close Ticket').setStyle('DANGER').setCustomId(`close-ticket`)
				),
			];

			if (channel.Quote) embeds[0].fields.push({ name: 'Message', value: ticket.Message, inline: false });
			if (channel.Text) embeds[0].fields.push({ name: 'Please read', value: channel.Text, inline: false });
			if (channel.Private)
				embeds[0].setFooter({ text: "Couldn't make Thread Private, due to insufficient Booster Level" });

			const messagePayload = content ? { content, embeds, components } : { embeds, components };
			await thread.send(messagePayload);

			try {
				const logChannel = await msg.guild.channels.fetch(Settings.LogChannelId, { force: true });
				if (!logChannel || !(logChannel instanceof TextChannel)) return;

				logChannel.send({
					embeds: [
						client.cleanEmbed({
							title: 'Ticket Created',
							fields: [
								{ name: 'User', value: `<@!${ticket.Creator}>`, inline: true },
								{ name: 'Number', value: ticket.Number.toString(), inline: true },
								{ name: 'Channel', value: `<#${ticket.Channel}>`, inline: true },
								{ name: 'Message', value: ticket.Message },
							],
							color: '#7BEA50',
							timestamp: date.getTime(),
						}),
					],
				});
			} catch {}
		});
	}
};

export const name: string = 'messageCreate';
