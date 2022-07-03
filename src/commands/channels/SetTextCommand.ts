import { ApplicationCommandOptionData, CommandInteraction, GuildMember, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	if (!(interaction.member as GuildMember).permissions.has('ADMINISTRATOR'))
		return interaction.reply({
			ephemeral: true,
			embeds: [client.errorEmbed({ description: '**Insufficient Permissions**\nAdministrator Permissions required!' })],
		});

	await interaction.deferReply();

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('ticket-channel')?.channel as TextChannel;
	const text = interaction.options.get('text')?.value as string;

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	if (text) {
		if (text.length > 256)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Text must not be longer than 256 characters!**' })],
			});

		Channel.Text = text;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Text updated**' })],
		});
	} else {
		Channel.Text = '';
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Text removed**' })],
		});
	}
};

export const name: string = 'text';
export const description: string = 'Set / Echo the Text for the Ticket';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'STRING',
		name: 'text',
		description: 'Set the Text of the Ticket Channel [max 256 characters]. Leave empty to disable.',
	},
];
