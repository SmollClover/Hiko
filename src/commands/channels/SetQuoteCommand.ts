import { ApplicationCommandOptionData, CommandInteraction, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('ticket-channel')?.channel as TextChannel;
	const action = interaction.options.get('true-or-false')?.value;

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	const status = Channel.Quote;

	if (action === true) {
		if (status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Message will already be quoted**' })],
			});

		Channel.Quote = true;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Message will now be quoted**' })],
		});
	} else if (action === false) {
		if (!status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: "**Message already won't be quoted**" })],
			});

		Channel.Quote = false;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: "**Message won't be quoted now**" })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status ? '🟢 **Message will be quoted**' : "🔴 **Message won't be quoted**",
				}),
			],
		});
	}
};

export const name: string = 'quote';
export const description: string = 'Enable / Disable the Quoting of the Users Message';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'BOOLEAN',
		name: 'true-or-false',
		description: 'Set whether to Quote the Users Message. Leave empty to echo current one.',
	},
];
