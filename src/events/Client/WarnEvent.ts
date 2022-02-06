import { RunFunction } from '../../interfaces/Event';
import consola from 'consola';

export const run: RunFunction = async (info) => {
	consola.warn(info);
};

export const name: string = 'warn';
