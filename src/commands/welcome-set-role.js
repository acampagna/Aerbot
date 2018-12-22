const CoreUtil = require("../utils/Util.js");
const Command = require("../Command.js");

module.exports = new Command({
	name: "welcome-set-role",
	description: "Sets the welcome role for new members",
	syntax: "welcome-set-role",
	admin: true,
	invoke
});

function invoke({ message, params, guildData, client }) {
	if (message.mentions.roles.size > 0) {
		let role = message.mentions.roles.first();
		guildData.updateWelcomeRole(role.id);
		return Promise.resolve("Set Welcome Role: " + role.name);
	} else {
		return Promise.resolve("You must @mention an existing role");
	}
}
