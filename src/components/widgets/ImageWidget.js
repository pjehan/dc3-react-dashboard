import React, { Component } from 'react';

const styles = {
  image: {
    height: '100%'
  }
}

class ImageWidget extends Component {
  render() {
    return (
      <img src={this.props.url} style={styles.image}/>
    );
  }
}

export default ImageWidget;
