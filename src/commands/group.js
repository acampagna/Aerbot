const CoreUtil = require("../utils/Util.js");
const Command = require("../Command.js");
const mongoose = require('mongoose');
const Group = mongoose.model('Group');
const Discord = require("discord.js");

module.exports = new Command({
	name: "group",
	description: "Adds/Removes a group for a user",
	syntax: "group",
	admin: false,
	invoke
});

/**
 * Lists all groups. Adds/Removes a group for a user if they specify a group by adding the group's role to them.
 * UNFINISHED. NEEDS TO BE CLEANED UP A BIT.
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
function invoke({ message, params, serverData, client }) {
	var groupName = params.join(" ").toLowerCase().trim();

	if(groupName.length === 0) {
		return new Promise(function(resolve, reject) {

			const pcGroupId = "5c44c370d521a71ed4118857";
			const ps4GroupId = "5c44c38ed521a71ed411885b";
			const xboxGroupId = "5c44c38bd521a71ed411885a";
			const switchGroupId = "5c44c387d521a71ed4118859";
			const mobileGroupId = "5c44c376d521a71ed4118858";

			
			var emojis = new Array();
			const embed = new Discord.RichEmbed();
			embed.setColor("RANDOM");
			embed.setTitle(`__Misc Groups__`);
			embed.setFooter("Click the corresponding reactions below to join a Misc group");

			var emojisPC = new Array();
			const embedPC = new Discord.RichEmbed();
			embedPC.setColor("RANDOM");
			embedPC.setTitle(`__PC Groups__`);
			embedPC.setFooter("Click the corresponding reactions below to join a PC group");

			var emojisMobile = new Array();
			const embedMobile = new Discord.RichEmbed();
			embedMobile.setColor("RANDOM");
			embedMobile.setTitle(`__Mobile Groups__`);
			embedMobile.setFooter("Click the corresponding reactions below to join a Mobile group");

			var emojisConsole = new Array();
			const embedConsole = new Discord.RichEmbed();
			embedConsole.setColor("RANDOM");
			embedConsole.setTitle(`__Console Groups__`);
			embedConsole.setFooter("Click the corresponding reactions below to join an Xbox, PS4, or Switch group");

			var desc = "";
			var pcDesc = "";
			var mobileDesc = "";
			var consoleDesc = "";
			
			Group.findAllPublicGroups().then(groups => {
				groups.forEach(group => {
					//embed.addField(group.name, group.numMembers + " members", true);
					var groupName = group.name;
					//var role = message.guild.roles.get(group.roleId);
					//console.log(group.roleId);
					//console.log(role.name);

					//var roleNum = role.members.array().length;
					var groupNum = group.numMembers;
					if(group.emoji) {
						var emoji = client.emojis.get(group.emoji);
						if(emoji) {
							if(group.platforms.includes("5c44c370d521a71ed4118857")) {
								pcDesc = pcDesc + emoji + " " + group.name + " - " + groupNum + " gamers\n";
								emojisPC.push(group.emoji);
							}
							if(group.platforms.includes("5c44c376d521a71ed4118858")) {
								mobileDesc = mobileDesc + emoji + " " + group.name + " - " + groupNum + " gamers\n";
								emojisMobile.push(group.emoji);
							}
							if(group.platforms.includes("5c44c387d521a71ed4118859") || group.platforms.includes("5c44c38bd521a71ed411885a") || group.platforms.includes("5c44c38ed521a71ed411885b")) {
								//console.log(groupName + " | " + group.emoji);
								//console.log("switch?: " + group.platforms.includes("5c44c387d521a71ed4118859") + " | xbox: " + group.platforms.includes("5c44c38bd521a71ed411885a") + " | ps4: " + group.platforms.includes("5c44c38ed521a71ed411885b"));
								
								consoleDesc = consoleDesc + emoji + " " + group.name + " - " + groupNum + " gamers\n";
								emojisConsole.push(group.emoji);
							}
							if(group.platforms.length === 0) {
								desc = desc + emoji + " " + group.name + " - " + groupNum + " gamers\n";
								emojis.push(group.emoji);
							}
						}
					}
				});

				embed.setDescription(desc);
				embedPC.setDescription(pcDesc);
				embedMobile.setDescription(mobileDesc);
				embedConsole.setDescription(consoleDesc);

				//console.log(embedConsole);
				//console.log(emojisConsole);

				message.channel.send(embed).then(function (message) {
					emojis.forEach(data => {
						message.react(data);
					});
				});

				message.channel.send(embedConsole).then(function (message) {
					emojisConsole.forEach(data => {
						message.react(data);
					});
				});

				message.channel.send(embedMobile).then(function (message) {
					emojisMobile.forEach(data => {
						message.react(data);
					});
				});

				message.channel.send(embedPC).then(function (message) {
					emojisPC.forEach(data => {
						message.react(data);
					});
				});
				
				resolve ("");
			});
		});
	} else {
		var role = message.guild.roles.find(role => role.name.toLowerCase().trim() === groupName.toLowerCase().trim());

		if(role) {
			if(message.member.roles.find(role => role.name.toLowerCase().trim() === groupName.toLowerCase().trim())) {
				message.member.removeRole(role);
				Group.findGroupByName(groupName).then(group => {
					console.log(group);
					group.decrementNumMembers();
					group.removeMember(groupName,message.member.id);
				}).catch(console.error);
		
				return Promise.resolve("Removed you from group " + groupName);
			} else {
				message.member.addRole(role);
				Group.findGroupByName(groupName).then(group => {
					console.log(group);
					group.incrementNumMembers();
					group.addMember(groupName,message.member.id);

					if(group.platforms.length > 0) {
						console.log("platforms > 0");
						if(group.platforms.length === 1) {
							Group.findGroupById(group.platforms[0]).then(platformGroup => {
								console.log(platformGroup);
								var role2 = message.guild.roles.find(role => role.name.toLowerCase().trim() === platformGroup.name.toLowerCase().trim());

								if(!message.member.roles.find(role => role.name.toLowerCase().trim() === platformGroup.name.toLowerCase().trim())) {
									message.member.addRole(role2);
									platformGroup.incrementNumMembers();
									platformGroup.addMember(platformGroup.name,message.member.id);
									message.reply("Automatically added you to group " + platformGroup.name);
								}
							}).catch(console.error);
						} else {
							//Do work to ask if they want to join any of the platforms for the game.
						}
					}

				}).catch(console.error);
		
				return Promise.resolve("Added you to group " + groupName);
			}
		} else {
			return Promise.resolve("Role " + groupName + " doesn't exist!");
		}
	}
}