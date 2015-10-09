import React, { Component } from 'react';
import styles from 'styles/main';

export default class Section extends Component {
  render() {
    return (
      <div className={styles['Section'] + ' cf'}>
        <div className={styles['Demo-description']}>
          <h2>{ this.props.title }</h2>
          <div className={styles['Demo-inputs']}>
            { this.props.children[0] }
          </div>
        </div>
        <div className={styles['Demo']}>
          { this.props.children[1] }
        </div>
      </div>
    )
  }
}
