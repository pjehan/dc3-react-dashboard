import React, { Component } from 'react';

const words = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];

const styles = {
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  title: {
    margin: '0 0 1em 0'
  }
}

class MessageWidget extends Component {

  render() {
    return (
      <div style={{backgroundColor: this.props.color, ...styles.container}}>
        <div>
          <h1 style={styles.title}>{this.props.title}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.message}}/>
        </div>
      </div>
    );
  }
}

export default MessageWidget;
