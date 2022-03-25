import { ApplicationCommandOptionData, CommandInteraction, GuildMember, Role } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';
import { Settings } from '../../interfaces/DB';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	if (!(interaction.member as GuildMember).permissions.has('ADMINISTRATOR'))
		return interaction.reply({
			ephemeral: true,
			embeds: [client.errorEmbed({ description: '**Insufficient Permissions**\nAdministrator Permissions required!' })],
		});

	await interaction.deferReply();

	const SettingsSchema = await client.db.load('settings');
	const Settings = (await SettingsSchema.findOne({ Guild: interaction.guildId })) as Settings;

	if (!Settings) {
		await interaction.editReply({
			embeds: [
				client.fatalErrorEmbed({
					title: 'Error encountered',
					description:
						'Rolling back Settings to Default and emitting Guild Join Event.\nPlease try again, after the Bot has sent the standard Invitation Message.',
				}),
			],
		});

		return client.emit('guildCreate', interaction.guild);
	}

	const user = interaction.options.get('user')?.member as GuildMember;
	const role = interaction.options.get('role')?.role as Role;
	const action = interaction.options.get('action')?.value.toString().toLowerCase();

	if (!user && !role)
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**You have to either specify a User or a Role!**' })],
		});

	if (user && role)
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**You may not add a User and a Role at the same time!**' })],
		});

	const id = user ? user.id : role.id;
	const status = Settings.Moderators.includes(id);

	if (action === 'add') {
		if (status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User/Role is already a Ticket Moderator**' })],
			});

		Settings.Moderators.push(id);
		await SettingsSchema.update({ Guild: interaction.guildId }, { ...Settings });

		return interaction.editReply({
			embeds: [client.embed({ description: '🟢 **Added to Ticket Moderators**' })],
		});
	} else if (action === 'remove') {
		if (!status)
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User/Role is not a Ticket Moderator**' })],
			});

		Settings.Moderators.splice(Settings.Moderators.indexOf(id), 1);
		await SettingsSchema.update({ Guild: interaction.guildId }, { ...Settings });

		return interaction.editReply({
			embeds: [client.embed({ description: '🔴 **Removed from Ticket Moderators**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status
						? '🟢 **User/Role is a Ticket Moderator**'
						: '🔴 **User/Role is not a Ticket Moderator**',
				}),
			],
		});
	} else {
		return interaction.editReply({
			embeds: [client.errorEmbed({ description: '**Unknown Action**\nOnly `add` or `remove` are allowed as actions' })],
		});
	}
};

export const name: string = 'moderator';
export const description: string = 'Add or Remove Ticket Moderators';
export const options: Array<ApplicationCommandOptionData> = [
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
		description: 'Whether to add or remove the User/Role from the Ticket Moderators. Leave empty to echo Status.',
	},
];
