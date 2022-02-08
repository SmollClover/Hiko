import { CommandInteraction, Message } from 'discord.js';
import { RunFunction } from '../interfaces/Command';

export const run: RunFunction = async (client, interaction: CommandInteraction) => {
	await interaction.reply({ content: 'Pinging...' });
	const reply = (await interaction.fetchReply()) as Message;

	await reply.edit({
		embeds: [
			client.embed({
				description: `WebSocket: ${client.ws.ping}ms\nMessage edit: ${
					reply.createdAt.getMilliseconds() - interaction.createdAt.getMilliseconds()
				}ms`,
			}),
		],
	});
};

export const name: string = 'ping';
export const description: string = 'Test Ping';
