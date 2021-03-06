const CoreUtil = require("../utils/Util.js");
const Command = require("../Command.js");
const GachaGameService = require("../services/GachaGameService");
const Discord = require("discord.js");

module.exports = new Command({
	name: "gacha",
	description: "Play Gacha Game!",
	syntax: "gacha",
	admin: false,
	invoke
});

const ggs = new GachaGameService();

/**
 * Gacha game! Threw this together for an event. Need to clean it up.
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
function invoke({ message, params, serverData, client }) {
	//CoreUtil.dateLog("SERVER DATA:");
	//CoreUtil.dateLog(serverData);

	if(ggs.getGameInProgress()) {
		if(CoreUtil.isMemberAdmin(message, serverData) && params[0] === "end") {
			return Promise.resolve(ggs.endGame());
		}
		//Game is in progress. Play the game
		let username = message.member.displayName;
		if(ggs.hasUserEntered(username)) {
			return Promise.resolve("You've already entered!");
		} else {
			return Promise.resolve(ggs.userEntry(message, params));
		}
	} else {
		//Game is not in progress. Need to start a game or yell if the user isn't an admin.
		if(CoreUtil.isMemberAdmin(message, serverData)) {
			if(params[0] === "retry") {
				return Promise.resolve(ggs.endGame());
			} else {
				return Promise.resolve(ggs.startGame(message, params[0]));
			}
		} else {
			return Promise.resolve("Gacha Game is not currently active");
		}
	}
}