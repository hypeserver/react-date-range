# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).



## [Unreleased]

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
  // you can view full list in https://github.com/Adphorus/react-date-range/tree/next/src/locale/index.js
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

### Added

- Date range selection by drag n drop.
