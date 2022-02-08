/*
NOTE: Completely depreacted due to the use of Discords Command Interactions.

TODO: Update this for Ticket creation process when applicable.

import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Command } from '../../interfaces/Command';
import ms from 'ms';

const PREFIX = '!';

export const run: RunFunction = async (client, msg: Message) => {
	if (!msg.content.toLowerCase().startsWith(PREFIX)) return;
	if (msg.author.bot || !msg.guild) return;

	const args: string[] = msg.content.slice(PREFIX.length).trim().split(/ +/g);
	const cmd: string | undefined = args.shift();
	const command: Command | undefined = client.commands.get(cmd) || client.commands.get(client.aliases.get(cmd));

	if (!command) return;
	if (client.cooldowns.has(`${msg.author.id}-${command.name}`))
		return await msg.channel.send({
			embeds: [
				client.embed(
					{
						description: `You have a cooldown of ${ms(
							client.cooldowns.get(`${msg.author.id}-${command.name}`) - Date.now(),
							{ long: true }
						)}`,
					},
					msg
				),
			],
		});

	command.run(client, msg, args).catch((reason: any) => {
		msg.channel.send({
			embeds: [
				client.errorEmbed(
					{ description: `An Error occurred while executing the command:\n\`\`\`typescript\n${reason}\n\`\`\`` },
					msg
				),
			],
		});

		return client.logger.error(reason);
	});
};

export const name: string = 'messageCreate';
*/