import { RunFunction } from '../../interfaces/Command';

export const run: RunFunction = async (client, msg, args) => {
	if (msg.author.id !== '267635879588134912') return;

	msg.channel.send({ content: `\`\`\`typescript\n${eval(args.join(' '))}\n\`\`\`` });
};

export const name: string = 'eval';
