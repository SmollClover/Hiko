import { RunFunction } from '../../interfaces/Event';

export const run: RunFunction = async (client) => {
	client.logger.success(`Client successfully started`);
};

export const name: string = 'ready';
