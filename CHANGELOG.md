# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 1.4.0

### Added
- `calendarFocus` prop: Whether calendar focus month should be forward-driven or backwards-driven. can be `forwards` or `backwards` (Default: `forwards`)
- `preventSnapRefocus` prop: prevents unneceessary refocus of shown range on selection. (Default: `false`)

## 1.3.0

### Added
- `retainEndDateOnFirstSelection` prop: You can prevent the endDate from changing for selections when the startDate is updated. Default behaviour is for endDate to reset which is preserved. This prop makes this configurable.


## 1.2.0

### Added
- `dayContentRenderer` prop: You can control how each date cell is rendered be passing this function that excepts a date and returns what need to be rendered (#242, #384, #476)


## 1.1.4

### Fixed
- #356: Use babel-plugin-date-fns to reduce bundle size
- #373, #415, #416: Add missing aria labels


## 1.0.0
### Changed
- BREAKING: `date-fns` is now loaded as a peerDependency. You can use this plugin with your own project's `date-fns` version. However if you want to keep using date-fns versions older than 2.0.0, (minimum version is 2.0.0-alpha.1) you need to pass the following props to your component. ([See the reason here](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg/), also see [this table](https://date-fns.org/docs/format))

```jsx
<Calendar
  dateDisplayFormat='MMM D, YYYY'
  monthDisplayFormat='MMM YYYY'
  weekdayDisplayFormat='ddd'
  dayDisplayFormat='D'
/>
```

### Added
- `weekStartsOn` prop: You can set the week start day. (Number, 0 - Sunday, 1 - Monday etc.) If not specified, gets the week start day from your locale.

- `weekdayDisplayFormat`, `dayDisplayFormat` and `monthDisplayFormat` props: For being able to use different versions of date-fns

- `startDatePlaceholder` and `endDatePlaceholder` props: You can set different placeholders for Date inputs. If not set, falls back to 'Early' and 'Continuous'.

- `fixedHeight` prop: Set this to `true` to prevent height change while selecting different months. Since some months require less than 6 lines to show, by setting this prop, you can force 6 lines for all months.

- `editableDateInputs` prop: Set this to `true` to make the inputs editable. Falls back to false.

- `DateInput` and `InputRangeField` are exported as dedicated components.


### Fixed
- Works with React 16, without warnings (Deprecated methods are removed: componentWillReceiveProps )
- IE11 Bug where the last day of each week is not shown.
- Now infinite scroll mode works as expected.

## 1.0.0 beta

### Changed
- BREAKING: `Calendar` and `DateRange` are now totally controlled components with stateless date management.

- BREAKING: React-date-range is no longer use moment out of the box. Input and output values are native Date object. Until v2 version you don't depent on momentjs. You can keep continue to use moment if you want like below

OLD
```js
// this.state.eventDate: momentjs object
<Calendar
  date={this.state.eventDate}
  onChange={date => this.setState({eventDate: date})}
/>
```

NEW
```js
<Calendar
  date={this.state.eventDate} // js object
  onChange={date => this.setState({ eventDate: date })} //
/>
```

NEW with moment (or any other date libraries)
```js
<Calendar
  date={this.state.eventDate.toDate()} // convert moment object to js Date
  onChange={date => this.setState({ eventDate: moment(date) })} //
/>
```
- BREAKING: Theming and style approach complately changed. `react-date-range` don't use inline styles any more. At the new version you should import **skeleton styles** and **theme styles**

```js
// main style file
import 'react-date-range/dist/styles.css';
// theme css file
import 'react-date-range/dist/theme/default.css';
```

- BREAKING: `Calendar` and `DateRange` Components, no longer support string typed `lang` prop.

 OLD
 ```js
  <Calendar lang="tr" />
```

 NEW
 ```js
  import turkish from 'react-date-range/locale/tr';
  // you can view full list in https://github.com/hypeserver/react-date-range/tree/next/src/locale/index.js
  <Calendar locale={turkish} />
```

- BREAKING: `DateRange` handle range data with `ranges:Array` prop instead of `startDate` and `endDate` props.

OLD
```js
  <DateRange
    startDate={new Date()}
    endDate={new Date(2048, 6, 6)}
    onChange={ change => {
      console.log(change);
      /* prints:
      {
        startDate: Moment,
        endDate: Moment
      }
      /*
    } }
  />
```

NEW
```js
  <DateRange
    ranges={[{
      startDate: new Date(),
      endDate: new Date(2048, 06, 06),
      key: 'selection',
    }]}
    onChange={changes => {
      console.log(changes);
      /* prints
      {
        selection: {
          startDate: Date,
          endDate: Date
        }
      }
      */
    }}
  />
```
- `calendars` prop renamed as `months`. And `Calendar` component is accepting `months` prop just like `DateRange`. Default value changed to `1` from `2`.
### Removed

- `format` prop removed. No longer accepts string input for `Calendar` or `DateRange`. You should parse dates like below:
Native js: `new Date(dateString)`
Date-fns: `fns.parse(dateString)`
Momentjs: `moment(dateString).toDate()`

- `disableDaysBeforeToday` prop removed. use `minDate={new Date()}` instead.
- `firstDayOfWeek` prop removed. It is auto detecting from locale prop.
- `init` prop removed.
- `specialDays` prop removed.

### Added
- `disabledDates` prop: It's a set of disabled dates.
- `DefinedRanges` component: It's a set of date presets. Receives `inputRanges`, `staticRanges` for setting date ranges.
- `DateRangePicker` component. It's combined version of `DateRange` with `DefinedRanges` component.
- Date range selection by drag.
- Infinite scroll feature. Sample usage:
```js
  const horizontalScroll={enabled: true, monthHeight: 300, monthWidth: 300 };
  const verticalScroll={enabled: true, monthHeight: 220, longMonthHeight: 240 };
  <DateRangePicker scroll={horizontalScroll} />
  <DateRangePicker scroll={verticalScroll} months={2} />
```
- `showPreview` prop added to control visibility of preview. Default value is `true`.
- `preview` prop added: It displays a preview range and overwrite DateRange's default preview. You can set a controlled preview with below shape of object.
```js
{
  startDate: [Date Object] || null,
  endDate: [Date Object] || null,
  color: '#fed14c',
}
```
- `onPreviewChange(date)` prop added: Callback function for preview changes. You can set controlled custom previews with `preview` prop.
- `focusedRange` prop added: It defines which range and step are focused. Common initial value is `[0, 0]`; first value is index of ranges, second value is which step on date range(startDate or endDate).
- `initialFocusedRange` prop added: Initial value for focused range. See `focusedRange` for usage.
- `onRangeFocusChange` prop added: Callback function for focus changes by user.
- `dragSelectionEnabled` prop added
- `showMonthAndYearPickers` prop added
