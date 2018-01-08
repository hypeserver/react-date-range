# react-date-range
[![npm](https://img.shields.io/npm/v/react-date-range.svg?style=flat-square)](https://www.npmjs.com/package/react-date-range)
![](https://img.shields.io/bithound/dependencies/github/adphorus/react-date-range.svg?style=flat-square)

[![npm](https://img.shields.io/npm/l/react-date-range.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/localeval.svg?style=flat-square)](https://www.npmjs.com/package/react-date-range)


A React component for choosing dates and date ranges. Uses [Moment.js](http://momentjs.com/) for date operations.

**Live Demo :** [http://adphorus.github.io/react-date-range](http://adphorus.github.io/react-date-range)

![](https://cdn.pbrd.co/images/1fjQlZzy.png)

## React Range Picker v2 is coming!💥

** Want to help us testing the next version? Let's go
[next branch](https://github.com/adphorus/react-date-range/tree/next)!**

## Getting Started
### Installation

```
$ npm install --save react-date-range
```

## Usage
### Date Picker
```javascript
import React, { Component } from 'react';
import { Calendar } from 'react-date-range';

class MyComponent extends Component {
	handleSelect(date){
		console.log(date); // Momentjs object
	}

	render(){
		return (
			<div>
				<Calendar
					onInit={this.handleSelect}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}

```

###### Available Options (props)
* **date:** *(String, Moment.js object, Function)* - default: today
* **format:** *(String)* - default: DD/MM/YYY
* **firstDayOfWeek** *(Number)* - default: [moment.localeData().firstDayOfWeek()](http://momentjs.com/docs/#/i18n/locale-data/)
* **theme:** *(Object)* see [Demo's source](https://github.com/Adphorus/react-date-range/blob/master/demo/src/components/Main.js#L130)
* **onInit:** *(Function)* default: none
* **onChange:** *(Function)* default: none
* **minDate:** *(String, Moment.js object, Function)* default: none
* **maxDate:** *(String, Moment.js object, Function)* default: none
* **lang:** *(String, 'cn' - Chinese, 'jp' - Japanese, 'fr' - French, 'it' - Italian, 'de' - German, 'es' - Spanish, 'ru' - Russian, 'tr' - Turkish, 'pt'  - Portuguese, 'fi' - Finnish)* default: none

### Range Picker
```javascript
import React, { Component } from 'react';
import { DateRange } from 'react-date-range';

class MyComponent extends Component {
	handleSelect(range){
		console.log(range);
		// An object with two keys,
		// 'startDate' and 'endDate' which are Momentjs objects.
	}

	render(){
		return (
			<div>
				<DateRange
					onInit={this.handleSelect}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}

```
