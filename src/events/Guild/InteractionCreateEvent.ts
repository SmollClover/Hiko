import { Interaction } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client, interaction: Interaction) => {
	if (interaction.isCommand()) {
		const command: Command | undefined = client.commands.get(interaction.commandName);
		if (!command) return;

		command.run(client, interaction).catch((reason: any) => {
			interaction.reply({
				embeds: [
					client.errorEmbed({
						description: `An Error occurred while executing the command:\n\`\`\`typescript\n${reason}\n\`\`\``,
					}),
				],
			});

			return client.logger.error(reason);
		});
	}
};

export const name: string = 'interactionCreate';
