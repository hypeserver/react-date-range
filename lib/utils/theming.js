"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.getStyleValue = getStyleValue;
var isExpectedType = function isExpectedType(obj, type) {
	return typeof obj === type;
};

function getStyleValue(customTheme, defaultTheme, style, type) {
	var defaultValue = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

	if (!isExpectedType(customTheme[style], "undefined") && isExpectedType(customTheme[style], type)) {
		return customTheme[style];
	} else if (!isExpectedType(defaultTheme[style], "undefined")) {
		return defaultTheme[style];
	} else {
		return defaultValue;
	}
}

;