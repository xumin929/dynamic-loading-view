/**
 * Created by songshuangwang on 2017/2/15.
 */

import React, {Component} from 'react';

export default class Divider extends Component {
  render() {
    const styles = require('./style/divider.less');
    return (
    <span className={styles.divider}></span>
    );
  }
}

