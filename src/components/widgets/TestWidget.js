import React, { Component } from 'react';

const words = ["Lorem", "Ipsum", "Dolor", "Sit", "Amet"];

const styles = {
  test: {
    height: '100%',
    lineHeight: '100%'
  }
}

class TestWidget extends Component {

  constructor(props) {
    super(props);

    this.state = { word: this.getRandomWord() };

    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    setInterval(() => this.props.animate().then(() => this.updateContent()), this.props.interval);
  }

  updateContent() {
    this.setState({ word: this.getRandomWord() });
  }

  getRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
  }

  render() {
    return (
      <div style={{backgroundColor: this.props.color, ...styles.test}}>{this.state.word}</div>
    );
  }
}

export default TestWidget;
