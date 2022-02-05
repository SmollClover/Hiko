import { Guild, GuildMember } from 'discord.js';

export const ResolveUser = async (user: string, guild: Guild) => {
	if (user.startsWith('<@!') && user.endsWith('>')) {
		user = user.slice(3).slice(0, user.length - 4);
	}

	if (!parseInt(user)) return;

	return await guild.members.fetch({ user });
};
