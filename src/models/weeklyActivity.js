const mongoose = require('mongoose');
const { Model, Schema } = mongoose

/**
 * Defines a weekly activity database model. 
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
module.exports = function() {

	const weeklyActivitySchema = new Schema({
		userId: String,
		//username: String,
		type: String,
		//numActivities: { type: Number, default: 0, min: 0 },
		exp: { type: Number, default: 0, min: 0 },
		date: {type: Date, default: new Date()},
	});

	weeklyActivitySchema.statics.add = function(userId, type, exp) {
		//console.log("Adding Weekly Activity");
		this.create({userId: userId, type: type, exp: exp});
	};

	weeklyActivitySchema.statics.addMap = function(userId, map) {
		console.log("Adding Weekly Activity from Map()");
		var _this = this;
		map.forEach(function(value, key) {
			_this.create({userId: userId, type: key, exp: value});
		});
	};

	weeklyActivitySchema.statics.findByUserId = function(id) {
		console.log("Finding all Weekly activity by userId");
		return this.find({userId: id}).exec();
	};

	weeklyActivitySchema.statics.findByUserIdType = function(id, type) {
		console.log("Finding Weekly activity by userId and type");
		return this.find({userId: id, type: type}).exec();
	};

	weeklyActivitySchema.statics.findAllActivity = function() {
		console.log("Finding ALL Weekly Activity");
		return this.find().exec();
	};

	weeklyActivitySchema.statics.findActivityByType = function() {
		console.log("Finding Weekly activity by type");
		return this.find({type: type}).exec();
	};

	weeklyActivitySchema.statics.getStatistics = function() {
		console.log("Getting Monthly Statistics");

		var _this = this;

		var userActivity = new Map();
		var typeActivity = new Map();
		return new Promise(function(resolve, reject) {
			_this.find().exec().then(activities => {
				activities.forEach(activity =>{
					var uid = activity.userId;
					var type = activity.type;
					var xp = activity.exp;

					if(userActivity.has(uid)) {
						var ua = userActivity.get(uid);
						ua.has(type) ? ua.set(type, ua.get(type)+xp) : ua.set(type, xp);
					} else {
						userActivity.set(uid, new Map([[type,xp]]));
					}

					if(typeActivity.has(type)) {
						typeActivity.set(type, typeActivity.get(type)+xp);
					} else {
						typeActivity.set(type, xp);
					}
				});

				var userActivityTotals = Array();
				var activeUsers = userActivity.size;

				userActivity.forEach(ua => {
					var total = 0;
					Array.from(ua.values()).forEach(val => total += val);

					userActivityTotals.push(total);
				});

				//console.log(userActivityTotals);

				if(isNaN(typeActivity.get("event"))) {
					typeActivity.set("event", 0);
				}

				if(isNaN(typeActivity.get("voice"))) {
					typeActivity.set("voice", 0);
				}

				typeActivity.set("total", typeActivity.get("message") + typeActivity.get("reaction") + typeActivity.get("event") + typeActivity.get("voice"));

				var avgExp = typeActivity.get("total") / activeUsers;

				//console.log({userActivity: userActivity, typeActivity: typeActivity});
				resolve (
					{
						userActivity: userActivity, 
						typeActivity: typeActivity, 
						activeUsers: activeUsers,
						avgExp: avgExp
					}
				);
			});
		});
	}

	let WeeklyActivityModel = mongoose.model('WeeklyActivity', weeklyActivitySchema);

	WeeklyActivityModel.upsert = function(doc){
		console.log(doc);
		return WeeklyActivityModel.findOneAndUpdate(
			{_id: doc.id},
			doc, 
			{upsert: true, new: true, runValidators: true, setDefaultsOnInsert: true}
		).exec();
	}
};