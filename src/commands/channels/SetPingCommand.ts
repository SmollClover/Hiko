import { ApplicationCommandOptionData, CommandInteraction, GuildMember, Role, TextChannel } from 'discord.js';
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
	const user = interaction.options.get('user')?.member as GuildMember;
	const role = interaction.options.get('role')?.role as Role;
	const action = interaction.options.get('action')?.value.toString().toLowerCase();

	if (user && role)
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**You may not add a User and a Role at the same time!**' })],
		});

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	const id = user ? user.id : role.id;
	const status = Channel.Pings.includes(id);

	if (action === 'add') {
		if (status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User/Role will already be pinged**' })],
			});

		Channel.Pings.push(id);
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Added User/Role to the pings**' })],
		});
	} else if (action === 'remove') {
		if (!status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: "**User/Role already won't be pinged**" })],
			});

		Channel.Pings.splice(Channel.Pings.indexOf(id), 1);
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Removed User/Role from pings**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status ? '🟢 **User/Role will be pinged**' : "🔴 **User/Role won't be pinged**",
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
export const description: string = 'Add or Remove a User/Role to be pinged on Ticket creation';
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
		description: 'The User in question. Can not be combined with role!',
	},
	{
		type: 'ROLE',
		name: 'role',
		description: 'The Role in question. Can not be combined with user!',
	},
	{
		type: 'STRING',
		name: 'action',
		description: 'Whether to add or remove the User from the Ticket Pings. Leave empty to echo Ping Status.',
	},
];
