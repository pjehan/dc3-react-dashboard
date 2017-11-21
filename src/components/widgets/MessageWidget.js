import React, { Component } from 'react';

const words = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];

const styles = {
  container: {
    height: '100%'
  },
  title: {
    margin: 0,
    paddingTop: "1em"
  }
}

class MessageWidget extends Component {

  render() {
    return (
      <div style={{backgroundColor: this.props.color, ...styles.container}}>
        <h1 style={styles.title}>{this.props.title}</h1>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default MessageWidget;
