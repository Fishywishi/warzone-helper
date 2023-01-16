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
