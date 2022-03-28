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

	return interaction.editReply({
		embeds: [client.errorEmbed({ description: "**Function currenlty doesn't work and is therefore deactivated**" })],
	});

	const ChannelsSchema = await client.db.load('channels');
	const Channels = (await ChannelsSchema.find({ Guild: interaction.guildId })) as Array<Channels>;

	const channel = interaction.options.get('ticket-channel')?.channel as TextChannel;
	const action = interaction.options.get('true-or-false')?.value;

	const Channel = Channels.find((c) => c.Channel === channel.id);
	if (!Channel)
		return interaction.editReply({ embeds: [client.errorEmbed({ description: '**Channel is not a Ticket Channel!**' })] });

	const status = Channel.Private;

	if (action === true) {
		if (status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Threads are already Private**' })],
			});

		Channel.Private = true;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Threads will now be Private**' })],
		});
	} else if (action === false) {
		if (!status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**Threads are already Public**' })],
			});

		Channel.Private = false;
		await ChannelsSchema.update({ Channel: channel.id }, { ...Channel });

		return interaction.editReply({
			embeds: [client.embed({ description: '**Threads will now be Public**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status ? '🔐 **Threads will be Private**' : '🔓 **Threads will be Public**',
				}),
			],
		});
	}
};

export const name: string = 'private';
export const description: string = 'Make Threads be Private or not. Requires Server Boost Level 2!';
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
		description: 'Set whether the Thread should be Private or not. Leave empty to echo current status.',
	},
];
