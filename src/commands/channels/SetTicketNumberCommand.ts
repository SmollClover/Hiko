import { ApplicationCommandOptionData, CommandInteraction, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('ticket-channel')?.channel as TextChannel;
	const number = interaction.options.get('number')?.value as number;

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	if (number === undefined) {
		return interaction.editReply({
			embeds: [client.embed({ description: `**Current Ticket Number: ${Channel.Number}**` })],
		});
	} else {
		if (number < 0)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Ticket Number must not be below zero!**' })],
			});

		Channel.Number = number;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: `**Ticket Number set to ${number}**` })],
		});
	}
};

export const name: string = 'number';
export const description: string = 'Set / Echo the next Ticket Number';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'NUMBER',
		name: 'number',
		description: 'Set the Ticket Number to this one. Leave empty to echo current one.',
	},
];
