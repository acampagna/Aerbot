const CoreUtil = require("../utils/Util.js");
const Command = require("../Command.js");
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Discord = require("discord.js");
const HandleActivity = require("../HandleActivity");

module.exports = new Command({
	name: "exp",
	description: "Adds or subtracts exp from a member",
	syntax: "exp",
	admin: true,
	invoke
});

/**
 * Sets and displays accounts for a member. Currently we use a single default for setting and displaying.
 * UNFINISHED. NEEDS CLEANUP. NEEDS TO BE FINISHED.
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
function invoke({ message, params, serverData, client }) {
	if (message.mentions.users.first() && !isNaN(params[0])) {
		User.byId(message.mentions.users.first().id).then(user => {
			user.expAdjustment += parseInt(params[0]);
			user.exp += parseInt(params[0]);
			user.save();
			//console.log(user);
		});
		return Promise.resolve("Adjusted " + message.mentions.users.first() + "'s exp by " + params[0]);
	} else {
		return Promise.resolve("You must supply an exp amount and @mention a user to give bonus exp or remove exp");
	}
}