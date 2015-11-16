let isExpectedType = (obj, type) => typeof obj === type;

export function getStyleValue(customTheme, defaultTheme, style, type, defaultValue = 0) {
	
	if (!isExpectedType(customTheme[style], "undefined") && isExpectedType(customTheme[style], type)) {
		return customTheme[style];
	}
	else if (!isExpectedType(defaultTheme[style], "undefined")) {
		return defaultTheme[style];
	}
	else {
		return defaultValue;
	}
};