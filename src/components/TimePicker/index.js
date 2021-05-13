import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {
  isEqual,
  isValid,
  eachMinuteOfInterval,
  differenceInMilliseconds,
  startOfDay,
  endOfDay,
  format,
  parse,
} from 'date-fns';

class TimePicker extends PureComponent {
  constructor(props, context) {
    super(props, context);

    this.state = {
      changes: false,
      value: this.formatDate(props),
    };

    this.closest_interval = React.createRef();
  }

  componentDidMount() {
    this.closest_interval.current.scrollIntoView();
  }

  componentDidUpdate(prevProps) {
    const { value } = prevProps;

    if (!isEqual(value, this.props.value)) {
      this.setState({ value: this.formatDate(this.props) });
    }
  }

  formatDate({ value, dateDisplayFormat, dateOptions }) {
    if (value && isValid(value)) {
      return format(value, dateDisplayFormat, dateOptions);
    }
    return '';
  }

  update(value) {
    const { onChange } = this.props;

    onChange(value);
  }

  render() {
    const { value } = this.state;

    const { dateDisplayFormat, dateOptions } = this.props;
    const parsed = parse(value, dateDisplayFormat, new Date(), dateOptions);

    const intervals = eachMinuteOfInterval(
      {
        start: startOfDay(parsed),
        end: endOfDay(parsed),
      },
      { step: 15 }
    );

    let closest_interval = intervals[0];
    intervals.forEach(interval => {
      if (
        Math.abs(differenceInMilliseconds(parsed, interval)) <
        Math.abs(differenceInMilliseconds(parsed, closest_interval))
      ) {
        closest_interval = interval;
      }
    });

    return (
      <div className={classnames('rdrTimePicker')}>
        {intervals.map((minute, i) => (
          <button
            ref={minute === closest_interval ? this.closest_interval : null}
            className={minute === closest_interval ? 'active' : ''}
            key={i}
            onClick={() => this.update(minute)}
            type="button">
            {format(minute, 'h:mma')}
          </button>
        ))}
      </div>
    );
  }
}

TimePicker.propTypes = {
  value: PropTypes.object,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  dateOptions: PropTypes.object,
  dateDisplayFormat: PropTypes.string,
  className: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

TimePicker.defaultProps = {
  readOnly: true,
  disabled: false,
  dateDisplayFormat: 'MMM D, YYYY',
};

export default TimePicker;
