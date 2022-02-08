import { ApplicationCommandDataResolvable } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Command } from '../../interfaces/Command';

export const run: RunFunction = async (client) => {
	client.logger.success(`Client successfully started`);

	const devGuildId = '833444087255662623';
	const devGuild = client.guilds.cache.get(devGuildId);

	const commands = process.env.PROD ? client.application.commands : devGuild.commands;

	client.commands.map(async (command: Command) => {
		commands.create({ ...(command as ApplicationCommandDataResolvable) });
	});
};

export const name: string = 'ready';
