import { Command, RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, msg) => {
	return await msg.channel.send({
		content: 'Not yet implemented',
	});
};

export const name: string = 'help';
