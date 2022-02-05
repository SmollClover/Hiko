import { RunFunction } from '../../interfaces/Command';
import { ResolveUser } from '../../functions/ResolveUser';

export const run: RunFunction = async (client, msg, args) => {
	if (msg.author.id !== '267635879588134912') return;

	client.logger.log(await ResolveUser(args[0], msg.guild));
};

export const name: string = 'log';
