import { ApplicationCommandOptionData, CommandInteraction, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('channel')?.channel as TextChannel;
	const action = interaction.options.get('action')?.value.toString().toLowerCase();

	if (action === 'add') {
		if (Channels.find((c) => c.Channel === channel.id))
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Channel is already a Ticket Channel**' })],
			});

		await ChannelsSchema.create({
			Guild: interaction.guildId,
			Channel: channel.id,
			Number: 0,
			Quote: true,
			Pings: [],
			Text: '',
		});

		return interaction.editReply({
			embeds: [client.embed({ description: '**Added Channel to Ticket Channels**' })],
		});
	} else if (action === 'remove') {
		if (!Channels.find((c) => c.Channel === channel.id))
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel**' })],
			});

		await ChannelsSchema.delete({ Channel: channel.id });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Removed Channel from Ticket Channels**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: Channels.find((c) => c.Channel === channel.id)
						? '🟢 **Channel is a Ticket Channel**'
						: '🔴 **Channel is not a Ticket Channel**',
				}),
			],
		});
	} else {
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**Unknown Action**\nOnly `add` or `remove` are allowed as actions' })],
		});
	}
};

export const name: string = 'channel';
export const description: string = 'Add or Remove a Channel from Ticket System';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'channel',
		description: 'The Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'STRING',
		name: 'action',
		description: 'Whether to add or remove the Channel from the Ticket Channels. Leave empty to echo Channel Status.',
	},
];
