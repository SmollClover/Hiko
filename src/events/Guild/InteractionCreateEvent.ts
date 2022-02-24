import { Interaction } from 'discord.js';
import { Command } from '../../interfaces/Command';
import { Button } from '../../interfaces/Button';
import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client, interaction: Interaction) => {
	if (interaction.isCommand()) {
		const command: Command | undefined = client.commands.get(interaction.commandName);
		if (!command) return;

		command.run(client, interaction).catch((reason: any) => {
			interaction.reply({
				embeds: [
					client.fatalErrorEmbed({
						description: `An Error occurred while executing the command:\n\`\`\`typescript\n${reason}\n\`\`\``,
					}),
				],
			});

			return client.logger.error(reason);
		});
	} else if (interaction.isButton()) {
		const button: Button | undefined = client.buttons.get(interaction.customId);
		if (!button) return;

		button.run(client, interaction).catch((reason: any) => {
			interaction.reply({
				embeds: [
					client.fatalErrorEmbed({
						description: `An Error occurred while executing the command:\n\`\`\`typescript\n${reason}\n\`\`\``,
					}),
				],
			});
		});
	}
};

export const name: string = 'interactionCreate';
