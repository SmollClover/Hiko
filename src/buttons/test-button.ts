import { ButtonInteraction } from 'discord.js';
import { RunFunction } from '../interfaces/Button';

export const run: RunFunction = async (client, interaction: ButtonInteraction) => {
	interaction.reply({ content: 'Erfolgreich!' });
};

export const customId: string = 'test-button';
