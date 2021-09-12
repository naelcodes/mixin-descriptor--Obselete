"use strict";
/**
 *  Use to set the property descriptors of the source object to the destination object
 *
 * @param {Object} destination Object to add properties to
 * @param {Object} source Object from which the properties  will be cloned
 * @param {Boolean} redefine Boolean use to choose property redefinition, by default it's true
 * @param {Object} setting  choose either to merge the descriptors field or method or both
 * @param {Array}  selectedDescriptors  list of selected properties from the source
 */

function mixin (dest, source, redefine = true, setting = {}, selectedDescriptors = []) {

	if (arguments.length >= 2) {
		if (!dest) {
			throw new TypeError("argument dest is required!");
		}
		if (!source) {
			throw new TypeError("argument source is required!");
		}

		if (arguments.length === 2 || arguments.length === 3) {
			setting = { fields: true, methods: true };
		}
	}

	if (arguments.length >= 3) {
		if (typeof redefine !== "boolean") {
			throw new TypeError(`redefine must be typeof boolean but it's type of ${typeof redefine}`);
		}
	}

	if (arguments.length >= 4) {

		if (typeof setting !== "object") {
			throw new TypeError(`Setting must be of type object but is of type ${typeof setting}`);
		}
		if (Object.keys(setting).length === 0) {
			throw new Error("Setting must have at least one parameter");
		}
		// if settings has one field
		if (setting.methods === undefined && typeof setting.fields === "boolean") {
			setting.methods = false;
		}

		if (setting.fields === undefined && typeof setting.methods === "boolean") {
			setting.fields = false;
		}

		if (typeof setting.fields !== "boolean") {
			throw new TypeError(`Setting.fields must be typeof boolean but it's type of ${typeof setting.fields}`);
		}

		if (typeof setting.methods !== "boolean") {
			throw new TypeError(`Setting.method must be typeof boolean but it's type of ${typeof setting.methods}`);
		}

		if (arguments.length === 5) {
			if (!Array.isArray(selectedDescriptors)) {
				throw new TypeError(`${arguments[3].name} must be an Array`);
			}
		}

	}

	if (selectedDescriptors.length === 0) {
		// set the source property descriptor fields and/or methods to destination
		for (let name in source) {
			let redefineResult = redefine ? source[name] : dest[name];
			// if the selected descriptor is a method 

			if (setting.methods && typeof source[name] === "function") {
				dest[name] = !dest.hasOwnProperty(name) ? source[name] : redefineResult;
			}
			if (setting.fields && typeof source[name] !== "function") {
				dest[name] = !dest.hasOwnProperty(name) ? source[name] : redefineResult;
			}
		}
	}

	// set the selected  source property descriptors  to destination
	if (selectedDescriptors.length > 0) {
		// (selectedDescriptors.length > 0 && setting.method)
		selectedDescriptors.forEach((name) => {
			//if the property name isn't found on the source
			if (!source.hasOwnProperty(name)) {
				throw new ReferenceError(`The source object doesn't have the property : ${name}`);
			}
			let redefineResult = redefine ? source[name] : dest[name];
			// if the selected descriptor is a method 

			if (setting.methods && typeof source[name] === "function") {
				dest[name] = !dest.hasOwnProperty(name) ? source[name] : redefineResult;
			}
			if (setting.fields && typeof source[name] !== "function") {
				dest[name] = !dest.hasOwnProperty(name) ? source[name] : redefineResult;
			}
		});
	}
}

module.exports = mixin;
