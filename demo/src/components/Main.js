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

import '../../../src/styles.css';
import '../../../src/theme/default.css';

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
          startDate: addDays(new Date(), 1115),
          endDate: null,
        },
      },
      compareRanges: {
        selection: {
          startDate: addDays(new Date(), 1),
          endDate: null,
        },
        compare: {
          startDate: addDays(new Date(), 4),
          endDate: addDays(new Date(), 8),
        },
      },
      datePickerInternational: addDays(new Date(), 1167),
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
              showMonthArrow={false}
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
            />
          </div>
        </Section>

        <Section title="Date Range Picker - Multiple Range">
          <div>
            <label className={'label'}>Selection Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.compareRanges.selection.startDate, '-')}
            />
            <label className={'label'}>Selection End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.compareRanges.selection.endDate, 'Continuous')}
            />
            <div className={'newLine'} />
            <label className={'label'}>Compare Start:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.compareRanges.compare.startDate, '-')}
            />
            <label className={'label'}>Compare End:</label>
            <input
              type="text"
              readOnly
              value={formatDateDisplay(this.state.compareRanges.compare.endDate, 'Continuous')}
            />
          </div>
          <DateRangePicker
            onChange={this.handleRangeChange.bind(this, 'compareRanges')}
            ranges={[
              {
                startDate: this.state.compareRanges.selection.startDate,
                endDate: this.state.compareRanges.selection.endDate,
                key: 'selection',
              },
              {
                startDate: this.state.compareRanges.compare.startDate,
                endDate: this.state.compareRanges.compare.endDate,
                key: 'compare',
                color: '#3ecf8e',
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
