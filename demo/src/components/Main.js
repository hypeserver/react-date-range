import React, { Component } from 'react';
import { Calendar, DateRange, DateRangePicker, DefinedRange } from '../../../src';
import * as rdrLocales from '../../../src/locale';
import { format, addDays } from 'date-fns';
import Section from './Section';

const nameMapper = {
  ar: 'Arabic (Modern Standard Arabic - Al-fussha)',
  bg: 'Bulgarian',
  ca: 'Catalan',
  cs: 'Czech',
  da: 'Danish',
  de: 'German',
  el: 'Greek',
  enGB: 'English (United Kingdom)',
  enUS: 'English (United States)',
  eo: 'Esperanto',
  es: 'Spanish',
  fi: 'Finnish',
  fil: 'Filipino',
  frCH: 'French',
  fr: 'French',
  hr: 'Croatian',
  id: 'Indonesian',
  is: 'Icelandic',
  it: 'Italian',
  ja: 'Japanese',
  ko: 'Korean',
  mk: 'Macedonian',
  nb: 'Norwegian Bokmål',
  nl: 'Dutch',
  pl: 'Polish',
  pt: 'Portuguese',
  ro: 'Romanian',
  ru: 'Russian',
  sk: 'Slovak',
  sv: 'Swedish',
  th: 'Thai',
  tr: 'Turkish',
  ua: 'Ukrainian',
  vi: 'Vietnamese',
  zhCN: 'Chinese Simplified',
  zhTW: 'Chinese Traditional',
};

const localeOptions = Object.keys(rdrLocales).map(key => ({
  value: key,
  label: `${key} - ${nameMapper[key] || ''}`,
}));

import 'normalize.css';
import '../styles/global.css';
import '../styles/main.css';

import '../../../src/styles.scss';
import '../../../src/theme/default.scss';

function formatDateDisplay(date, defaultText) {
  if (!date) return defaultText;
  return format(date, 'MM/DD/YYYY');
}

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      dateRange: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        },
      },
      definedRange: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        },
      },
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        },
        compare: {
          startDate: new Date(),
          endDate: addDays(new Date(), 3),
          key: 'compare',
        },
      },
      multipleRanges: {
        selection1: {
          startDate: addDays(new Date(), 1),
          endDate: null,
          key: 'selection1',
        },
        selection2: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
          key: 'selection2',
        },
        selection3: {
          startDate: addDays(new Date(), 8),
          endDate: addDays(new Date(), 10),
          key: 'selection3',
          showDateDisplay: false,
          autoFocus: false,
        },
      },
      datePickerInternational: null,
      locale: 'ja',
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
          key: 'selection',
        },
      },
    };
  }

  handleChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: payload,
    });
  }
  handleRangeChange(which, payload) {
    console.log(which, payload);
    this.setState({
      [which]: {
        ...this.state[which],
        ...payload,
      },
    });
  }

  render() {
    return (
      <main className={'Main'}>
        <h1 className={'Title'}>React-date-range</h1>

        <Section title="DateRangePicker - 2 month">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRangePicker.selection.startDate)}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRangePicker.selection.endDate)}
            />
          </div>
          <div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, 'dateRangePicker')}
              showSelectionPreview={true}
              moveRangeOnFirstSelection={false}
              className={'PreviewArea'}
              months={2}
              ranges={[this.state.dateRangePicker.selection]}
              direction="horizontal"
            />
          </div>
        </Section>

        <Section title="DateRangePicker - Vertical Infinite">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRangePickerI.selection.startDate)}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRangePickerI.selection.endDate)}
            />
          </div>
          <div>
            <DateRangePicker
              onChange={this.handleRangeChange.bind(this, 'dateRangePickerI')}
              className={'PreviewArea'}
              months={1}
              minDate={addDays(new Date(), -300)}
              maxDate={addDays(new Date(), 900)}
              direction="vertical"
              scroll={{ enabled: true }}
              ranges={[this.state.dateRangePickerI.selection, this.state.dateRangePickerI.compare]}
            />
          </div>
        </Section>

        <Section title="DateRangePicker - Multiple Range">
          <div>
            <label className={'label'}>Selection1 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection1.startDate, '-')}
            />
            <label className={'label'}>Selection1 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection1.endDate, 'Continuous')}
            />
            <div className={'newLine'} />

            <label className={'label'}>Selection2 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection2.startDate, '-')}
            />
            <label className={'label'}>Selection2 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection2.endDate, 'Continuous')}
            />
            <div className={'newLine'} />

            <label className={'label'}>Selection3 Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection3.startDate, '-')}
            />
            <label className={'label'}>Selection3 End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.multipleRanges.selection3.endDate, 'Continuous')}
            />
          </div>
          <DateRangePicker
            onChange={this.handleRangeChange.bind(this, 'multipleRanges')}
            ranges={[
              this.state.multipleRanges.selection1,
              this.state.multipleRanges.selection2,
              this.state.multipleRanges.selection3,
            ]}
            className={'PreviewArea'}
          />
        </Section>

        <Section title="DatePicker - Internationalization">
          <div>
            <select
              onChange={e => this.setState({ locale: e.target.value })}
              value={this.state.locale}>
              {localeOptions.map((option, i) => (
                <option value={option.value} key={i}>
                  {option.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.datePickerInternational)}
            />
          </div>
          <Calendar
            locale={rdrLocales[this.state.locale]}
            date={this.state.datePickerInternational}
            onChange={this.handleChange.bind(this, 'datePickerInternational')}
            className={'PreviewArea'}
          />
        </Section>

        <Section title="RangePicker">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRange.selection.startDate)}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.dateRange.selection.endDate, 'Continuous')}
            />
          </div>

          <DateRange
            onChange={this.handleRangeChange.bind(this, 'dateRange')}
            moveRangeOnFirstSelection={false}
            ranges={[this.state.dateRange.selection]}
            className={'PreviewArea'}
          />
        </Section>
        <Section title="DefinedRange">
          <div>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.definedRange.selection.startDate)}
            />
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.definedRange.selection.endDate, 'Continuous')}
            />
          </div>

          <DefinedRange
            ranges={[this.state.definedRange.selection]}
            onChange={this.handleRangeChange.bind(this, 'definedRange')}
            className={'centered'}
          />
        </Section>
      </main>
    );
  }
}
