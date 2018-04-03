import React, { Component } from 'react';
import { Calendar, DateRange, DateRangePicker } from '../../../src';
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
        },
      },
      dateRangePickerI: {
        selection: {
          startDate: new Date(),
          endDate: null,
        },
      },
      multipleRanges: {
        selection1: {
          startDate: addDays(new Date(), 1),
          endDate: null,
        },
        selection2: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
        },
        selection3: {
          startDate: addDays(new Date(), 8),
          endDate: addDays(new Date(), 10),
        },
      },
      datePickerInternational: new Date(),
      locale: 'ja',
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: addDays(new Date(), 7),
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

        <Section title="Date Range Picker - 2 month">
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
              ranges={[
                {
                  startDate: this.state.dateRangePicker.selection.startDate,
                  endDate: this.state.dateRangePicker.selection.endDate,
                  key: 'selection',
                },
              ]}
              direction="horizontal"
            />
          </div>
        </Section>

        <Section title="Date Range Picker - Vertical Infinite">
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
              ranges={[
                {
                  startDate: this.state.dateRangePickerI.selection.startDate,
                  endDate: this.state.dateRangePickerI.selection.endDate,
                  key: 'selection',
                },
              ]}
            />
          </div>
        </Section>

        <Section title="Date Range Picker - Multiple Range">
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
              {
                startDate: this.state.multipleRanges.selection1.startDate,
                endDate: this.state.multipleRanges.selection1.endDate,
                key: 'selection1',
                // color: '#3d91ff',
              },
              {
                startDate: this.state.multipleRanges.selection2.startDate,
                endDate: this.state.multipleRanges.selection2.endDate,
                key: 'selection2',
                // color: '#3ecf8e',
              },
              {
                startDate: this.state.multipleRanges.selection3.startDate,
                endDate: this.state.multipleRanges.selection3.endDate,
                key: 'selection3',
                showDateDisplay: false,
                autoFocus: false,
                // color: '#fed14c',
              },
            ]}
            className={'PreviewArea'}
          />
        </Section>

        <Section title="Date Picker - Internationalization">
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

        <Section title="Range Picker">
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
            ranges={[
              {
                startDate: this.state.dateRange.selection.startDate,
                endDate: this.state.dateRange.selection.endDate,
                key: 'selection',
              },
            ]}
            className={'PreviewArea'}
          />
        </Section>
      </main>
    );
  }
}
