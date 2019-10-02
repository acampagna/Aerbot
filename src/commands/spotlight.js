const CoreUtil = require("../utils/Util.js");
const Command = require("../Command.js");
const mongoose = require('mongoose');
const User = mongoose.model('Spotlight');
const Discord = require("discord.js");

module.exports = new Command({
	name: "spotlight",
	description: "Currently just sends spotlight message",
	syntax: "spotlight",
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
	/*return new Promise(function(resolve, reject) {
		const embed = new Discord.RichEmbed();
		embed.setColor("GREEN");
		embed.setTitle(`__ACCOUNTS__`)
		User.findById(message.member.id).exec().then(user => {
			let accounts = user.getAccounts();
			for (var [key, value] of accounts) {
				if(key != "" && value != "")
					embed.addField(key, value); 
			}
			resolve ({embed});
		});
	});*/

	/*const embedOne = new Discord.RichEmbed();
	embedOne.setTitle("Game Spotlight - Dota Underlords *(Not a MOBA)*")
	embedOne.setColor("GOLD");
	embedOne.setDescription("A few of us have been playing Dota Underlords lately and it's been a blast. It's a fun cross-platform strategy game without too much time commitment"
	+ " that can be played on a phone or computer. We think it would be great if more people tried it out and started playing together.\n\n"
	+ "[Underlords Website](https://www.underlords.com/) | [Underlords Trailer](https://www.youtube.com/watch?v=z5HPrRBZptY) | [Underlords Intro Guide](https://www.youtube.com/watch?v=5866Pt1o3EI)");
	embedOne.addField("Dota Underlords", "Dota Underlords is a free-to-play strategy game in the fast-growing Auto Chess genre (It is NOT a MOBA). "
	+ "The game is based on a popular Dota 2 community created game mode called Dota Auto Chess. Underlords pits you against seven opponents in a battle of wits that will have "
	+ "you building, combining, and leveling-up a crew in a battle of dominance.")
	embedOne.addField("Platforms", "Mobile & PC", true);
	embedOne.addField("Genre", "Auto Chess", true);
	embedOne.addField("Players", "2-8", true);
	embedOne.addField("Price", "Free", true);
	embedOne.addField("Crossplay", "Players across Android, iOS, Windows, macOS, and Linux can all play together");
	embedOne.setFooter("Please be sure to join the Underlords group by clicking the :dotaUnderlords: reaction below");
	embedOne.setAuthor("Dota Underlords","https://i.imgur.com/896Mhm3.png", "https://www.underlords.com/");
	embedOne.setImage("https://i.imgur.com/3Tac0uS.jpg");*/

	/*const embedOne = new Discord.RichEmbed();
	embedOne.setTitle("Game Spotlight - Brawl Stars")
	embedOne.setColor("GOLD");
	embedOne.setDescription("Brawl Stars is a free-to-play mobile top-down arcade arena shooter developed and published by Supercell."
	+ " Brawl Stars is centered around shooting other players to bring down their health and defeat them.\n\nPlayers can choose between many different brawlers, "
	+ "each with their own main and ultimate attacks. Games are very quick, fast-paced, and fun which is perfect for a mobile shooter. \n\n"
	+ "[Website](https://supercell.com/en/games/brawlstars/) | [Trailer](https://www.youtube.com/watch?v=CaryjOdYFa0) | [Intro Guide](https://www.youtube.com/watch?v=6_0Sph8YB9E)");
	embedOne.addField("Platforms", "Mobile", true);
	embedOne.addField("Genre", "Arcade Shooter", true);
	embedOne.addField("Players", "2-10", true);
	embedOne.addField("Price", "Free", true);
	embedOne.setFooter("Please be sure to join the Brawl Stars group by clicking the :brawlStars: reaction below");
	embedOne.setAuthor("Brawl Stars","https://i.imgur.com/UGPXIAy.jpg", "https://supercell.com/en/games/brawlstars/");
	embedOne.setImage("https://i.imgur.com/0kn9XL8.jpg");*/

	const emojiId = "624999051493900309";
	const gameName = "Call of Duty Mobile";
	const gameWebsite = "https://www.callofduty.com/mobile";

	var gameEmoji = client.emojis.get(emojiId);
	var eventsChannel = client.channels.get("612175461551833129");

	const embedOne = new Discord.RichEmbed();
	embedOne.setTitle("Game Spotlight - " + gameName);
	embedOne.setColor("GOLD");
	embedOne.setDescription("Call of Duty: Mobile is a free-to-play first-person shooter game for Android and iOS. CoD: Mobile allows you to play 5v5 games in many of the great "
	+ "CoD game modes that you've come to love such as Team Deathmatch, Domination, and Search & Destroy. It also has a 100 player Battle Royale with classes, guns, gun upgrades, vehicles, resurrection, zombies, and more!"
	+ " This truly is a great interpretation of CoD on a mobile device. Come join the COD group and lets play together!"
	+ "\n\n[CoD:M Website](" + gameWebsite + ") | [CoD:M Trailer](https://www.youtube.com/watch?v=n4b8FRUDNZo) | [CoD:M Walkthrough](https://www.youtube.com/watch?v=eiYQ4jGf4wE)");
	embedOne.addField("Platforms", "Mobile", true);
	embedOne.addField("Genre", "FPS & BR", true);
	embedOne.addField("Players", "5+", true);
	embedOne.addField("Price", "Free", true);
	embedOne.addField("Clan", "Join the DauntlessGC clan once you hit level 5!");
	embedOne.setFooter("Please be sure to join the " + gameName + " group by clicking the reaction below");
	embedOne.setAuthor(gameName,"https://i.imgur.com/PZ9xsSI.png", gameWebsite);
	embedOne.setImage("https://i.imgur.com/3QzEjH6.jpg");

	newMessage = message.channel.send("@everyone Today's Game Spotlight is " + gameName + "! If this game sounds interesting to you please click the " + gameEmoji + " reaction below to join the group. Please check out " + eventsChannel + " for " + gameName + " events happening soon!", { embed: embedOne }).then(function (message) {
		message.react(emojiId);
		//message.pin();
	}).catch(function() {
		//Something
	});
} 