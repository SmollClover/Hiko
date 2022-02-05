import { Message } from 'discord.js';
import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, msg) => {
	const message: Message = await msg.channel.send({ content: 'Pinging...' });
	await message.edit({
		embeds: [
			client.embed(
				{
					description: `WebSocket: ${client.ws.ping}ms\nMessage edit: ${
						message.createdAt.getMilliseconds() - msg.createdAt.getMilliseconds()
					}ms`,
				},
				message
			),
		],
	});
};

export const name: string = 'ping';
export const aliases: string[] = ['pong'];
