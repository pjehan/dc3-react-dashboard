import React, { Component } from 'react';

const styles = {
    cinemaWidget: {
        borderRadius: '5px',
        height: '100%',
        boxShadow: '0px 0px 2px 0px rgba(0,0,0,0.12), 0px 2px 2px 0px rgba(0,0,0,0.24)'
    }
}

class CinemaWidget extends Component {

    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            displayedMovie: {}
        };

        this.getRandomMovie = this.getRandomMovie.bind(this);
    }

    componentDidMount() {
        fetch('https://api.themoviedb.org/3/movie/now_playing?api_key=3d7cf719a2e58fdbbbdf2e3e18d283b3&language=fr-FR&page=1&region=FR')
        .then((response) => {
            return response.json();
        })
        .then((responseJson) => {
            const currentMovies = responseJson.results;
            this.setState({ movies: currentMovies })
        })
        .then(() => {
            this.getRandomMovie();
        })
    }

    getRandomMovie() {
        const randomMovie = this.state.movies[Math.floor(Math.random() * this.state.movies.length)];
        this.setState({ displayedMovie: randomMovie })
    }

    render() {
        const poster = "https://image.tmdb.org/t/p/w320" + this.state.displayedMovie.poster_path;
        const releaseDate = new Date(this.state.displayedMovie.release_date);
        var widgetOverview = new String(this.state.displayedMovie.overview).substr(0, 400);

        if (widgetOverview.length > 275) {
            var widgetOverview = widgetOverview + "...";
            console.log(widgetOverview)
        }

        return(
            <div className="CinemaWidget" style={{backgroundColor: this.props.color, ...styles.cinemaWidget}}>
                <div className="CinemaWidget_container">
                    <div className="CinemaWidget_left">
                        <div className="CinemaWidget_visual" style={{backgroundImage: `url(${poster}) `}}></div>
                    </div>
                    <div className="CinemaWidget_right">
                        <div className="CinemaWidget_rightTop">
                            <h2 className="CinemaWidget_title">{this.state.displayedMovie.title}</h2>
                            <span className="CinemaWidget_voteAverage">{this.state.displayedMovie.vote_average}</span>
                        </div>
                        <div className="CinemaWidget_rightInfos">
                            <span className="CinemaWidget_releaseDate">{releaseDate.toLocaleDateString("fr-FR")}</span>
                        </div>
                        <p className="CinemaWidget_overview">{widgetOverview}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default CinemaWidget;
