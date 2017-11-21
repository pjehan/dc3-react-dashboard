import React, { Component } from 'react';
import { Dashboard, Widget } from 'dc-react-dashboard';
import ImageWidget from './components/widgets/ImageWidget';
import TestWidget from './components/widgets/TestWidget';
import VideoWidget from './components/widgets/VideoWidget';
import CinemaWidget from './components/widgets/CinemaWidget';
import 'animate.css';
import FacebookWidget from './components/widgets/FacebookWidget';
const FacebookParameters = ({
    AccessToken: '141025039980686|WIbGKZ-SBglRTurxFIn_hrO5L9s',        /* getaccesstoken of Facebook API */
    AppSecretToken : '6ec93b27df5d9937c907f104377d1e94',    /* SecretToken of Facebook API */
    PageName : 'Digital Campus Rennes',          /* Name of the Facebook page */
    PageId : '532247756912168',            /* ID of the Facebook page */
    RefreshTime: 900,        /* Indicade refresh time of Facebook Widget in second */
    LimitDisplay: 3       /* Indicade limit of post */
});
class App extends Component {

  render() {
    return (
      <Dashboard gutter={10} row={3} col={5} animationClassOut="animated zoomOut" animationClassIn="animated zoomIn">
        <Widget size="large">
          <TestWidget interval="5000" color="green"/>
        </Widget>
        <Widget size="large">
          <CinemaWidget interval="8000" charactersOverview="110" apiKey="f9359bbc6caa4ffacb2930958ce7db77" color="#f5f5f5"/>
        </Widget>
        <Widget size="large">
          <FacebookWidget {...FacebookParameters}/>
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
        <Widget size="big">
          <VideoWidget url="https://www.youtube.com/embed/hjIOMV3d4rE"/>
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
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
        <Widget size="normal">
          <ImageWidget url="https://pbs.twimg.com/profile_images/910474947906154497/_Z4JoumF_400x400.jpg"/>
        </Widget>
      </Dashboard>
    );
  }
}

export default App;
