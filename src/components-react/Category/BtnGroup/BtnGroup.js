import React, {Component} from 'react';

export default class BtnGroup extends Component {
    render() {
      const styles = import('./style/btnGroup.less');
      return (
            <div className={styles.btnGroup}>{this.props.children}</div>
        );
    }
}
