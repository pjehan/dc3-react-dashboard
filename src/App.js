import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import firebaseConfig from './firebase';
import { Dashboard, Widget } from 'dc-react-dashboard';
import ImageWidget from './components/widgets/ImageWidget';
import GalleryWidget from './components/widgets/GalleryWidget';
import MessageWidget from './components/widgets/MessageWidget';
import TestWidget from './components/widgets/TestWidget';
import VideoWidget from './components/widgets/VideoWidget';
import 'animate.css';

const app = firebase.initializeApp(firebaseConfig);

const components = {
  test: TestWidget,
  gallery: GalleryWidget,
  video: VideoWidget,
  message: MessageWidget
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
  }
}

export default App;
