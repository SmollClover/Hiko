import { RunFunction } from '../../interfaces/Event';
import consola from 'consola';

export const run: RunFunction = async (error) => {
	consola.error(error);
};

export const name: string = 'error';
