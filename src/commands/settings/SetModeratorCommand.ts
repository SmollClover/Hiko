import { ApplicationCommandOptionData, CommandInteraction, Guild } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.deferReply();

	const SettingsSchema = await client.db.load('settings');
	const Settings = await SettingsSchema.findOne({ Guild: interaction.guildId });

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

	const user = interaction.options.get('user').user;
	const action = interaction.options.get('action')?.value;
	const status = Settings.Moderators.includes(user.id);

	if (action === 'add') {
		if (Settings.Moderators.includes(user.id))
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User is already a Ticket Moderator**' })],
			});

		await Settings.Moderators.push(user.id);
		await SettingsSchema.update({ Guild: interaction.guildId }, { ...Settings });

		return interaction.editReply({
			embeds: [client.embed({ description: '🟢 **Added to Ticket Moderators**' })],
		});
	} else if (action === 'remove') {
		if (!Settings.Moderators.includes(user.id))
			return interaction.editReply({
				embeds: [client.errorEmbed({ description: '**User is not a Ticket Moderator**' })],
			});

		await Settings.Moderators.splice(Settings.Moderators.indexOf(user.id), 1);
		await SettingsSchema.update({ Guild: interaction.guildId }, { ...Settings });

		return interaction.editReply({
			embeds: [client.embed({ description: '🔴 **Removed from Ticket Moderators**' })],
		});
	} else if (!action) {
		return interaction.editReply({
			embeds: [
				client.embed({
					description: status ? '🟢 **User is a Ticket Moderator**' : '🔴 **User is not a Ticket Moderator**',
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
		description: 'The User in question.',
		required: true,
	},
	{
		type: 'STRING',
		name: 'action',
		description: 'Whether to add or remove the User from the Ticket Moderators. Leave empty to echo Moderator Status.',
	},
];
