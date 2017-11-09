import React, { Component } from 'react';

const styles = {
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  }
}

class GalleryWidget extends Component {

  constructor(props) {
    super(props);

    this.state = { url: this.props.images[0], index: 0 };

    this.updateContent = this.updateContent.bind(this);
  }

  componentDidMount() {
    if (this.props.images.length > 1) {
      setInterval(() => this.props.animate().then(() => this.updateContent()), this.props.interval);
    }
  }

  updateContent() {
    let index = this.state.index + 1;
    if (!this.props.images[index]) {
      index = 0;
    }
    this.setState({ url: this.props.images[index], index: index });
  }

  render() {
    return (
      <img src={this.state.url} style={styles.image}/>
    );
  }
}

export default GalleryWidget;
