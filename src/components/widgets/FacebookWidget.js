import React, {Component} from 'react';
import graph from 'fb-react-sdk';
import PropTypes from 'prop-types';
import './FacebookWidget.css';
import moment from 'moment';

/**
 * Maybe store reactions into another stuff
 */
const reactions = {
    like: {
        count: 0,
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
        position: '-153px -54px',
    },
    love: {
        count: 0,
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
        position: '-102px -54px',
    },
    haha: {
        count: 0,
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
        position: '-68px -54px'
    },
    wow: {
        count: 0,
        position: '-17px -71px',
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
    },
    sad: {
        count: 0,
        position: '-136px -54px',
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
    },
    angry: {
        count: 0,
        position: '0 -54px',
        background: 'url(https://www.facebook.com/rsrc.php/v3/y6/r/80Toi9Z6PPm.png)',
    },
    total_count: 0,
};
/**
 * Parameters to get likes and reaction to the post
 * get likes , wow, sad, angry, haha, love
 */
const likesCount = 'reactions.type(LIKE).limit(0).summary(1).as(like),reactions.type(WOW).limit(0).summary(1).as(wow),' +
    'reactions.type(SAD).limit(0).summary(1).as(sad),reactions.type(LOVE).limit(0).summary(1).as(love),' +
    'reactions.type(HAHA).limit(0).summary(1).as(haha),reactions.type(ANGRY).limit(0).summary(1).as(angry)';

class FacebookWidget extends Component {

    constructor(props) {
        super(props);

        graph.setAccessToken(this.props.AccessToken);
        this.state = ({
            postList: []
        });

        this.getPosts = this.getPosts.bind(this);
        setInterval(this.getPosts, this.props.RefreshTime * 1000);
    }

    componentWillMount() {
        this.getPosts();
    }

    getPosts() {
        /**
         * Get the posts information (maybe we will be able to refactor this)
         *  Only returns :
         *  created_time | message | post id
         */
        graph.get('/' + this.props.PageId + '/posts?limit=' + this.props.LimitDisplay, (err, res) => {
            let posts = res.data;

            /**
             * On every post data we get more informations
             * Returns : description | media:{ image: { height|src|width } } | target: { id | url } | type | url
             */
            for (let i = 0; i < posts.length; i++) {
                let parsingDate = Date.parse(posts[i].created_time);
                let date = new Date(parsingDate);
                posts[i].created_time = moment(date).format('Do MMMM YYYY, h:mm a');
                graph.get('/' + posts[i].id + '/attachments', (error, response) => {
                    Object.assign(posts[i], response.data[0]);
                    if (i === posts.length - 1) {
                        this.setState({
                            postList: posts
                        });
                    }
                });
                /**
                 * Returns like and reaction total_count |viewer_reaction
                 */
                graph.get('/' + posts[i].id + '?fields=' + likesCount, (err, res) => {
                    /**
                     * refactor might be possible
                     */
                    reactions.like.count = res.like.summary.total_count;
                    reactions.wow.count = res.wow.summary.total_count;
                    reactions.sad.count = res.sad.summary.total_count;
                    reactions.angry.count = res.angry.summary.total_count;
                    reactions.haha.count = res.haha.summary.total_count;
                    reactions.love.count = res.love.summary.total_count;
                    /**
                     * Creating a new object in order to insert it to the reactions
                     */
                    let likes = {
                        total_count: reactions.wow.count + reactions.sad.count + reactions.like.count + reactions.angry.count + reactions.love.count + reactions.haha.count
                    };
                    Object.assign(reactions, likes);
                    Object.assign(posts[i], reactions);
                    if (i === posts.length - 1) {
                        this.setState({
                            postList: posts
                        });
                    }
                })

            }
        });
    }

    render() {

        let Posts = this.state.postList.map((post, index) => {
            let likes = [];
            let reaction_icon = [];

            if (post.total_count !== 0) {
                reaction_icon[index] = <span className="icon"><i style={{
                    background: reactions.like.background,
                    backgroundPosition: reactions.like.position
                }}/></span>;
                /**
                 * need to add all the conditions for the reactions
                 */
                likes[index] = <span className="likes">{post.total_count} personnes aiment</span>;
            }
            return ( <li className="fb-post" key={index}>
                <header>
                    <div>
                        <img alt={this.props.PageName}
                             src="https://scontent-lht6-1.xx.fbcdn.net/v/t1.0-1/p50x50/21617579_1103004239836514_8280169357330925400_n.png?oh=7022e84633d570d5b09cc71ef6fbeba9&oe=5AA66EA9"/>
                    </div>
                    <div>
                        <p>{this.props.PageName}</p>
                        <time>{post.created_time}</time>
                    </div>
                </header>
                <div>
                    <p>{post.message}</p>
                </div>
                <div className="icon">
                    {reaction_icon}
                    {likes}
                </div>
            </li>)
        });
        return (
            <ul id="widget-facebook">
                {Posts}
            </ul>
        )
    }
}

/**
 * Props
 */
FacebookWidget.propTypes = {
    AccessToken: PropTypes.string.isRequired, /* getaccesstoken of Facebook API */
    AppSecretToken: PropTypes.string.isRequired, /* SecretToken of Facebook API */
    PageName: PropTypes.string.isRequired, /* Name of the Facebook page */
    PageId: PropTypes.string.isRequired, /* ID of the Facebook page */
    RefreshTime: PropTypes.number, /* Indicade refresh time of Facebook Widget in second */
    LimitDisplay: PropTypes.number, /* Indicade limit of posts */
};

/**
 * Default Props
 */
FacebookWidget.defaultProps = {
    AccessToken: '', /* getaccesstoken of Facebook API */
    AppSecretToken: '', /* SecretToken of Facebook API */
    PageName: '', /* Name of the Facebook page */
    PageId: '', /* ID of the Facebook page */
    RefreshTime: 900, /* 15 Minutes */
    LimitDisplay: 10, /* Indicade limit of posts */
};
export default FacebookWidget;
