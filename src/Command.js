const CoreUtil = require("./utils/Util.js");

/**
 * Defines a command
 * TAKEN FROM SOME TUTORIAL BOT.
 * @author acampagna
 * @copyright Dauntless Gaming Community 2019
 */
module.exports = class Command {
	constructor({ name, description, syntax, admin, invoke }) {
		this.name = name;
		this.description = description;
		this.syntax = syntax;
		this.admin = admin;
		this.invoke = invoke;

		/*if(CoreUtil.isObject(permissions)) {
			this.admin = permissions.admin;
			this.moderator = permissions.moderator;
		} else {
			this.admin = admin;
			this.moderator = false;
		}*/

		const params = this.syntax.split(/ +/);
		const optionalParams = params.filter(x => x.match(/^\[.+\]$/));

		this.maxParamCount = params.length - 1;
		this.expectedParamCount = this.maxParamCount - optionalParams.length;
	}
};