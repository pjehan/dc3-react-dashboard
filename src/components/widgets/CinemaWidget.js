import React, { Component } from 'react';

const styles = {
    cinemaWidget: {
        borderRadius: '5px',
        height: '100%',
        boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)',
        position: 'relative',
        fontFamily: "'Roboto', sans-serif"
    },

    cinemaWidgetContainer: {
        height: '95%',
        width: '95%',
        padding: '0 10px',
        paddingRight: '25px',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        transition: '1s ease-in-out'
    },

    cinemaWidgetLeft: {
        width: '30%',
        height: '100%'
    },

    cinemaWidgetVisual: {
        height: '100%',
        width: '100%',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    },

    cinemaWidgetRight: {
        width: '70%',
        height: '100%',
        padding: '20px 0',
        marginLeft: '25px'
    },

    cinemaWidgetRightTop: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    cinemaWidgetTitle: {
        margin: '0',
        fontSize: '26px',
        letterSpacing: '2px'
    },

    cinemaWidgetVoteAverage: {
        display: 'inlineBlock',
        lineHeight: '23px',
        fontWeight: '700',
        borderRadius: '4px',
        padding: '7px 8px',
        color: '#fff',
        borderBottom: '1.5px solid #638205',
        backgroundColor: '#81a70c'
    },

    cinemaWidgetReleaseDate: {
        fontSize: '12px',
        color: '#747474'
    },

    cinemaWidgetOverview: {
        fontSize: '13px',
        lineHeight: '1.75',
        paddingTop: '20px',
        borderTop: '1px solid #cbcbcb'
    }
}

class CinemaWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            index: 0,
            displayedMovie: {},
            classNameFade: 'fadeIn'
        };

    }

    componentDidMount() {
        fetch("https://api.themoviedb.org/3/movie/now_playing?api_key=" + this.props.apiKey + "&language=fr-FR&page=1&region=FR")
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            this.setState({ movies: responseJson.results })
        })
        .then(() => {
            this.getNextMovie();
            setInterval(() => this.props.animate().then(() => this.getNextMovie()), this.props.interval);
        })
        .catch((error) => console.log(error))
    }

    getNextMovie() {
        if (this.state.index == this.state.movies.length) {
            this.setState({ index: 0 })
        }

        const nextMovie = this.state.movies[this.state.index];
        this.setState({ displayedMovie: nextMovie, index: this.state.index + 1 })
    }

    render() {
        if(!this.state.displayedMovie) {
          return (<div>Loading...</div>);
        }

        const poster = "https://image.tmdb.org/t/p/w320" + this.state.displayedMovie.poster_path;
        const releaseDate = new Date(this.state.displayedMovie.release_date);
        var widgetOverview = new String(this.state.displayedMovie.overview).substr(0, this.props.charactersOverview) + "...";

        return(
            <div className="CinemaWidget" style={{backgroundColor: this.props.color, ...styles.cinemaWidget}}>
                <div style ={styles.cinemaWidgetContainer} className={'CinemaWidget_container animated ' + this.state.classNameFade}>
                    <div className="CinemaWidget_left" style={styles.cinemaWidgetLeft}>
                        <div className="CinemaWidget_visual" style={{backgroundImage: `url(${poster}) `, ...styles.cinemaWidgetVisual}}></div>
                    </div>
                    <div className="CinemaWidget_right" style={styles.cinemaWidgetRight}>
                        <div className="CinemaWidget_rightTop" style={styles.cinemaWidgetRightTop}>
                            <h2 className="CinemaWidget_title" style={styles.cinemaWidgetTitle}>{this.state.displayedMovie.title}</h2>
                            <span className="CinemaWidget_voteAverage" style={styles.cinemaWidgetVoteAverage}>{this.state.displayedMovie.vote_average}</span>
                        </div>
                        <div className="CinemaWidget_rightInfos">
                            <span className="CinemaWidget_releaseDate" style={styles.cinemaWidgetReleaseDate}>{releaseDate.toLocaleDateString("fr-FR")}</span>
                        </div>
                        <p className="CinemaWidget_overview" style={styles.cinemaWidgetOverview}>{widgetOverview}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CinemaWidget;
