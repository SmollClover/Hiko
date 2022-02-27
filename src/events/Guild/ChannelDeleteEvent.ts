import { DMChannel, GuildChannel } from 'discord.js';
import { RunFunction } from '../../interfaces/Event';
import { Channels } from '../../interfaces/DB';

export const run: RunFunction = async (client, channel: DMChannel | GuildChannel) => {
	if (channel instanceof DMChannel) return;

	const ChannelsSchema = await client.db.load('channels');
	await ChannelsSchema.delete({ Channel: channel.id });
};

export const name: string = 'channelDelete';
