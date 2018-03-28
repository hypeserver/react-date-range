# react-date-range
[![npm](https://img.shields.io/npm/v/react-date-range.svg?style=flat-square)](https://www.npmjs.com/package/react-date-range)
![](https://img.shields.io/bithound/dependencies/github/adphorus/react-date-range.svg?style=flat-square)

[![npm](https://img.shields.io/npm/l/react-date-range.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dm/localeval.svg?style=flat-square)](https://www.npmjs.com/package/react-date-range)

⚠️ Warning: the current branch represents v2 pre-release version. See [v1 branch](https://github.com/Adphorus/react-date-range/tree/v1).

A library agnostic React component for choosing dates and date ranges. Uses [date-fns](http://date-fns.org/) for date operations.

### Why should you use `react-date-range`?

- Stateless date operations
- Highly configurable
- Multiple range selection
- Based on native js dates
- Drag n Drop selection
- Keyboard friendly

**Live Demo :** [http://adphorus.github.io/react-date-range](http://adphorus.github.io/react-date-range)

![](https://raw.githubusercontent.com/Adphorus/react-date-range/next/demo/assets/src/ss.png)


## Getting Started
### Installation

```
yarn add react-date-range@next
```

If you don't use yarn
```
$ npm install --save react-date-range@next
```

## Usage
### Date Picker
```javascript
import React, { Component } from 'react';
import { Calendar } from 'react-date-range';
// main style file
import 'react-date-range/dist/styles.css';
// theme css file
import 'react-date-range/dist/theme/default.css';


class MyComponent extends Component {
	handleSelect(date){
		console.log(date); // native Date object
	}

	render(){
		return (
			<div>
				<Calendar
					date={new Date()}
					onChange={this.handleSelect}
				/>
			</div>
		)
	}
}

```

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
### Options (DateRange, Calendar)
Property                             | type      | Default Value    | Desctiption
-------------------------------------|-----------|------------------|-----------------------------------------------------------------
locale                               | Object    | enUS from locale | you can view full list from [here](https://github.com/Adphorus/react-date-range/tree/next/src/locale/index.js). Locales directly exported from [`date-fns/locales`](https://date-fns.org/v2.0.0-alpha.7/docs/I18n#supported-languages).
className                            | String    |                  | wrapper classname
months                               | Number    | 1                | rendered month count
showSelectionPreview                 | Boolean   | true             | show preview on focused/hovered dates
previewColor                         | String    |                  | defines color for selection preview
shownDate                            | Date      |                  | initial focus date
specialDays                          | Date[]    | []               | defines special days
onPreviewChange                      | Func      |                  | callback for preview changes. fn()
minDate                              | Date      |                  | defines minimum date. Disabled earlier dates
maxDate                              | Date      |                  | defines maximum date. Disabled later dates
direction                            | String    | 'vertical'                 | defines maximum date. Disabled later dates
scroll                       				 | Object    | { enabled: false }| infinite scroll behaviour configuration. Checkout [Infinite Scroll](#infinite-scrolled-mode) section 
showMonthArrow                       | Boolean   | true             | show/hide month arrow button
navigatorRenderer                    | Func      |                  | renderer for focused date navigation area. fn(currentFocusedDate: Date, changeShownDate: func, props: object)
onChange(Calendar)                   | Func      |                  | callback function for date changes. fn(date: Date)
color(Calendar)                      | String    | `#3d91ff`        | defines color for selected date in Calendar
date(Calendar)                       | Date      |                  | date value for Calendar
onChange(DateRange)                  | Func      |                  | callback function for range changes. fn(changes). changes contains `startDate` and `endDate` under an object key of changed range
moveRangeOnFirstSelection(DateRange) | Boolean   | false            | move range on startDate selection. Otherwise endDate will replace with startDate.
ranges(Calendar)                     | *Object[] | []               | Defines ranges. array of range object
showDateDisplay(DateRange)      | Boolean   | true             | show/hide selection display row. Uses `dateDisplayFormat` for formatter
dateDisplayFormat(DateRange)         | String    | `MMM D,YYYY`     | selected range preview formatter. checkout [date-fns's format option](https://date-fns.org/v2.0.0-alpha.7/docs/format)


> *shape of range:
> ```js
>	{
>		startDate: PropTypes.object,
>		endDate: PropTypes.object,
>		color: PropTypes.string,
>		key: PropTypes.string,
>		autoFocus: PropTypes.bool,
>		disabled: PropTypes.bool,
>		show: PropTypes.bool,
>		showDateDisplay: PropTypes.bool,
>	}
>```

#### Infinite Scrolled Mode

	To enable infinite scroll set `scroll={{enabled: true}}` basically. Infinite scroll feature is affected by `direction`(rendering direction for months) and `months`(for rendered months count) props directly.
	If you prefer, you can overwrite calendar sizes with `calendarWidth`/`calendarHeight` or each month's height/withs with `monthWidth`/`monthHeight`/`longMonthHeight` at `scroll` prop.

```js
	// shape of scroll prop
  scroll: {
    enabled: PropTypes.bool, 
    monthHeight: PropTypes.number,
    longMonthHeight: PropTypes.number, // some months has 1 more row than others
    monthWidth: PropTypes.number, // just used when direction="horizontal"
    calendarWidth: PropTypes.number, // defaults monthWidth * months
    calendarHeight: PropTypes.number, // defaults monthHeight * months
  }),
```


TODOs

- make mobile friendly (integrate tap and swipe actions)
- add complex booking customization example with exposed renderer props
