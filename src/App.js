import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import firebaseConfig from './firebase';
import { Dashboard, Widget } from 'dc-react-dashboard';
import ImageWidget from './components/widgets/ImageWidget';
import GalleryWidget from './components/widgets/GalleryWidget';
import TestWidget from './components/widgets/TestWidget';
import VideoWidget from './components/widgets/VideoWidget';
import 'animate.css';

const app = firebase.initializeApp(firebaseConfig);

const components = {
  test: TestWidget,
  gallery: GalleryWidget,
  video: VideoWidget
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = { dashboard: null };
  }

  componentDidMount() {
    firebase.database().ref('dashboards/0').on('value', (snapshot) => {
      this.setState({ dashboard: snapshot.val() });
    }, (error) => console.log(error));
  }

  render() {

    if(!this.state.dashboard) {
      return (<div></div>);
    }

    const widgets = this.state.dashboard.widgets.map((widget, index) => {
      const WidgetComponent = components[widget.name];
      return (<Widget key={index} size={widget.size}><WidgetComponent {...widget.options} /></Widget>);
    });

    const dashboard = (<Dashboard {...this.state.dashboard.options}>{widgets}</Dashboard>);

    return dashboard;

    /*
    const images = [
      "https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg",
      "https://www.digital-campus.fr/sites/default/files/galerie/photo-rennes2.jpg"
    ];

    return (
      <Dashboard gutter={10} row={3} col={5} animationClassOut="animated rollOut" animationClassIn="animated rollIn">
        <Widget size="large">
          <TestWidget interval="5000" color="red"/>
        </Widget>
        <Widget size="normal" animationClassOut="animated zoomOut" animationClassIn="animated zoomIn">
          <GalleryWidget images={images} interval="3000"/>
        </Widget>
        <Widget size="normal">
          <VideoWidget url="https://www.youtube.com/watch?v=-36pVEqpTok"/>
        </Widget>
        <Widget size="large">
          <VideoWidget url="https://www.youtube.com/embed/hjIOMV3d4rE"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
        <Widget size="large">
          <ImageWidget url="https://www.digital-campus.fr/sites/default/files/actualite/oussama_2.jpg"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
      </Dashboard>
    );
    */
  }
}

export default App;
