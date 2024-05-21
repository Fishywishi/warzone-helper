import { Command, CommandRun, Context } from 'dabf';

let lastUsed: Date;
const mentionRoleId = process.env.PLAY_MENTION_ROLE_ID;

export class MentionCommand extends Command {
	id = 'mention';
	aliases = [
		'mention',
		'bop',
		'letsgetsomepeopleonandhavewarzonepoppinagainbaby',
	];

	@CommandRun()
	async run($: Context) {
		if (!$.message.guild)
			return $.message.channel.send(
				':warning: This command can only be used in a server'
			);

		// Certain roles required to use command
		const userRoles = $.message.member?.roles.cache;
		console.log(
			`roles ${$.message.member?.displayName}: ${userRoles
				?.map(r => r.name)
				.join(', ')}`
		);
		if (
			!userRoles?.some(r => r.name.toLowerCase() === 'linked') ||
			!(
				userRoles.some(r => r.id === mentionRoleId) ||
				userRoles.some(r => r.name.toLowerCase() === 'mention')
			)
		)
			return $.message.channel.send(
				':warning: You need to hold the mention role yourself and be linked to use this command. To link your account, use `/discord link` in-game.'
			);

		// Global twenty minute cooldown
		if (lastUsed && Date.now() - lastUsed.getTime() < 1_200_000)
			return $.message.channel.send(
				':warning: This command has already been used recently'
			);

		$.message.channel.send(
			`<@&${mentionRoleId}> (requested by ${$.message.member?.displayName}) `
		);

		lastUsed = new Date();
	}
}
