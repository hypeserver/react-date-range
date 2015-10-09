import React, { Component } from 'react';
import { defaultRanges, Calendar, DateRange } from 'react-date-range';
import Section from 'components/Section';

import 'normalize.css';
import 'styles/global'
import styles from 'styles/main';

export default class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      'rangePicker' : {},
      'linked' : {},
      'datePicker' : null,
      'predefined' : {},
    }
  }

  handleChange(which, payload) {
    this.setState({
      [which] : payload
    });
  }

  render() {
    const { rangePicker, linked, datePicker, predefined } = this.state;
    const format = 'dddd, D MMMM YYYY';

    return (
      <main className={styles['Main']}>

        <h1 className={styles['Title']}>React-date-range</h1>

        <Section title='Range Picker'>
          <div>
            <input
              type='text'
              readOnly
              value={ rangePicker['startDate'] && rangePicker['startDate'].format(format).toString() }
            />
            <input
              type='text'
              readOnly
              value={ rangePicker['endDate'] && rangePicker['endDate'].format(format).toString() }
            />
          </div>

          <DateRange
            startDate='10/11/2015'
            endDate={ now => {
              return '11/12/2015';
            }}
            onInit={ this.handleChange.bind(this, 'rangePicker') }
            onChange={ this.handleChange.bind(this, 'rangePicker') }
          />
        </Section>

        <Section title='Range Picker (Linked Calendars)'>
          <div>
            <input
              type='text'
              readOnly
              value={ linked['startDate'] && linked['startDate'].format(format).toString() }
            />
            <input
              type='text'
              readOnly
              value={ linked['endDate'] && linked['endDate'].format(format).toString() }
            />
          </div>
          <DateRange
            startDate={ now => {
              return '9/10/2015';
            }}
            endDate={ now => {
              return '13/11/2015';
            }}
            linkedCalendars={ true }
            onInit={ this.handleChange.bind(this, 'linked') }
            onChange={ this.handleChange.bind(this, 'linked') }
          />
        </Section>

        <Section title='Date Picker'>
          <div>
            <input
              type='text'
              readOnly
              value={ datePicker && datePicker.format(format).toString() }
            />
          </div>
          <Calendar
            date={ now => { return now.add(-4, 'days') } }
            onInit={ this.handleChange.bind(this, 'datePicker') }
            onChange={ this.handleChange.bind(this, 'datePicker') }
          />
        </Section>

        <Section title='Range Picker (Predefined Ranges)'>
          <div>
            <input
              type='text'
              readOnly
              value={ predefined['startDate'] && predefined['startDate'].format(format).toString() }
            />
            <input
              type='text'
              readOnly
              value={ predefined['endDate'] && predefined['endDate'].format(format).toString() }
            />
          </div>
          <DateRange
            linkedCalendars={ true }
            ranges={ defaultRanges }
            onInit={ this.handleChange.bind(this, 'predefined') }
            onChange={ this.handleChange.bind(this, 'predefined') }
            theme={{
              Calendar : { width: 200 },
              PredefinedRanges : { marginLeft: 10, marginTop: 10 }
            }}
          />
        </Section>

        <Section title='Theming'>
          <div />
          <DateRange
            linkedCalendars={ true }
            theme={{
              DateRange      : {
                background   : '#ffffff'
              },
              Calendar       : {
                background   : 'transparent',
                color        : '#95a5a6',
              },
              MonthAndYear   : {
                background   : '#e74c3c',
                color        : '#9e3024'
              },
              MonthButton    : {
                background   : '#c0392b'
              },
              MonthArrowPrev : {
                borderRightColor : '#d96659',
              },
              MonthArrowNext : {
                borderLeftColor : '#d96659',
              },
              Weekday        : {
                background   : '#e74c3c',
                color        : '#9e3024'
              },
              Day            : {
                transition   : 'transform .1s ease, box-shadow .1s ease, background .1s ease'
              },
              DaySelected    : {
                background   : '#8e44ad'
              },
              DayActive    : {
                background   : '#8e44ad',
                boxShadow    : 'none'
              },
              DayInRange     : {
                background   : '#9b59b6',
                color        : '#fff'
              },
              DayHover       : {
                background   : '#ffffff',
                color        : '#7f8c8d',
                transform    : 'scale(1.1) translateY(-10%)',
                boxShadow    : '0 2px 4px rgba(0, 0, 0, 0.4)'
              }
            }}
          />
        </Section>
      </main>
    )
  }
}
