const mongoose = require('mongoose');
const { Model, Schema } = mongoose

/**
 * Defines a server database model. Servers are servers in Discord.
 * I'm not totally sure about how to be using mongoose. As with everything in Javascript it seems very open-ended and sucks.
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
module.exports = function() {

	const serverSchema = new Schema({
		_id: String,
		officerRoleId: String,
		memberRoleId: String,
		groupCategory: String,
		welcomeRole: String,
		pccRoleId: String,
		subscriberRoleId: String,
		welcomeChannelId: String,
		introChannelId: String,
		spotlightChannel: String,
		adminRoleId: String,
		moderatorRoleId: String,
		eventCoordinatorRoleId: String,
		ppcRoleId: String,
		botChannelId: String,
		starboardChannelId: String,
		starboardEmojiId: String,
		publicChannelId: String,
		triviaChannelId: String,
		qotdChannelId: String,
		qotdMessageId: String,
		qotd: String,
		msgsSinceNewQotd: { type: Number, default: 0, min: 0 },
		levelRoles: {
			type: Map,
			of: String
		}
	});

	serverSchema.methods.resetMsgsSinceNewQotd = function () {
		this.model('Server').updateOne({_id: this.id},{msgsSinceNewQotd: 0}).exec();
	};

	serverSchema.methods.incMsgsSinceNewQotd = function () {
		this.model('Server').updateOne({_id: this.id},{msgsSinceNewQotd: this.msgsSinceNewQotd+1}).exec();
	};

	serverSchema.methods.updateQotd = function (qotd) {
		this.model('Server').updateOne({_id: this.id},{qotd: qotd}).exec();
	};

	serverSchema.methods.updateQotdChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{qotdChannelId: id}).exec();
	};

	serverSchema.methods.updateStarboardChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{starboardChannelId: id}).exec();
	};

	serverSchema.methods.updateStarboardEmojiId = function (id) {
		this.model('Server').updateOne({_id: this.id},{starboardEmojiId: id}).exec();
	};

	serverSchema.methods.updateQotdMessageId = function (id) {
		this.model('Server').updateOne({_id: this.id},{qotdMessageId: id}).exec();
	};

	serverSchema.methods.updateEventCoordinatorRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{eventCoordinatorRoleId: roleId}).exec();
	};

	serverSchema.methods.updatePPCRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{ppcRoleId: roleId}).exec();
	};

	serverSchema.methods.updateMemberRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{memberRoleId: roleId}).exec();
	};

	serverSchema.methods.updateIntroChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{introChannelId: id}).exec();
	};

	serverSchema.methods.updateTriviaChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{triviaChannelId: id}).exec();
	};

	serverSchema.methods.updateBotChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{botChannelId: id}).exec();
	};

	serverSchema.methods.updatePublicChannelId = function (id) {
		this.model('Server').updateOne({_id: this.id},{publicChannelId: id}).exec();
	};

	serverSchema.methods.updateOfficerRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{OfficerRoleId: roleId}).exec();
	};

	serverSchema.methods.updatePCCRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{pccRoleId: roleId}).exec();
	};

	serverSchema.methods.updateSubscriberRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{subscriberRoleId: roleId}).exec();
	};

	serverSchema.methods.updateAdminRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{adminRoleId: roleId}).exec();
	};

	serverSchema.methods.updateModeratorRoleId = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{moderatorRoleId: roleId}).exec();
	};

	serverSchema.methods.updateSpotlightChannel = function (id) {
		this.model('Server').updateOne({_id: this.id},{spotlightChannel: id}).exec();
	};

	serverSchema.methods.updateGroupCategory = function (categoryId) {
		this.model('Server').updateOne({_id: this.id},{groupCategory: categoryId}).exec();
	};

	//TODO: Fix to WelcomeRoleId
	serverSchema.methods.updateWelcomeRole = function (roleId) {
		this.model('Server').updateOne({_id: this.id},{welcomeRole: roleId}).exec();
	};

	serverSchema.methods.updateWelcomeChannelId = function (channelId) {
		this.model('Server').updateOne({_id: this.id},{welcomeChannelId: channelId}).exec();
	};

	let ServerModel = mongoose.model('Server', serverSchema);

	ServerModel.upsert = function(doc){
		return ServerModel.findOneAndUpdate(
			{_id: doc._id},
			doc, 
			{upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true}
		).exec();
	}
};