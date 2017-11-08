import React, { Component } from 'react';

const styles = {
  video: {
    width: "100%",
    height: "100%"
  }
};

function youtube_parser(url){
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : false;
}

class VideoWidget extends Component {

  render() {
    const domain = this.props.url.split('/')[2];
    switch (domain) {
      case 'www.youtube.com':
        var code = youtube_parser(this.props.url);
        return (<iframe src={ 'https://www.youtube.com/embed/' + code + '?autoplay=0&loop=1&playlist=' + code } frameBorder="0" style={styles.video}></iframe>);
        break;
      default:
        return (<div>URL not supported!</div>);
    }
  }

}

export default VideoWidget;
