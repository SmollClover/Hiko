import { ApplicationCommandOptionData, CommandInteraction, GuildMember, TextChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('ticket-channel')?.channel as TextChannel;
	const user = interaction.options.get('user')?.member as GuildMember;
	const action = interaction.options.get('action')?.value.toString().toLowerCase();

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	const status = Channel.Pings.includes(user.id);

	if (action === 'add') {
		if (status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User will already be pinged**' })],
			});

		Channel.Pings.push(user.id);
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Added User to the pings**' })],
		});
	} else if (action === 'remove') {
		if (!status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: "**User already won't be pinged**" })],
			});

		Channel.Pings.splice(Channel.Pings.indexOf(user.id), 1);
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Removed User from pings**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status ? '🟢 **User will be pinged**' : "🔴 **User won't be pinged**",
				}),
			],
		});
	} else {
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**Unknown Action**\nOnly `add` or `remove` are allowed as actions' })],
		});
	}
};

export const name: string = 'ping';
export const description: string = 'Add or Remove Roles to be pinged on Ticket creation';
export const options: Array<ApplicationCommandOptionData> = [
	{
		type: 'CHANNEL',
		name: 'ticket-channel',
		description: 'The Ticket Channel in question.',
		channelTypes: ['GUILD_TEXT'],
		required: true,
	},
	{
		type: 'USER',
		name: 'user',
		description: 'The User in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'action',
		description: 'Whether to add or remove the User from the Ticket Pings. Leave empty to echo Ping Status.',
	},
];
