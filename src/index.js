import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.css';
import { Avatar, Button, Card, CardContent, CardHeader } from 'ui-neumorphism';
import 'ui-neumorphism/dist/index.css'

function Tweet({ tweet }) {
    return (
        <>
            <Card className="tweet--neu">
                <CardContent>
                    <div className="flex">
                        <AuthorAvatar hash={tweet.gravatar} />
                        <div className="content">
                            <Author author={tweet.author} />
                            <Time time={tweet.timestamp} />
                            <Message text={tweet.message} />
                        </div>
                    </div>
                    <div className="buttons">
                        <ReplyButton />
                        <RetweetButton count={tweet.retweets} />
                        <LikeButton count={tweet.likes} />
                        <MoreOptionsButton />
                    </div>
                </CardContent>
            </Card>
            <Envelope from={person1} to={person2} />
        </>
    )
}

const testTweet = {
    message: 'Something about cats.',
    gravatar: 'xyz',
    author: {
        handle: 'catperson',
        name: 'IAMA Cat Person'
    },
    likes: 5,
    retweets: 111,
    timestamp: new Date() - 500000
}

Tweet.propTypes = PropTypes.shape({
    message: PropTypes.string,
    likes: PropTypes.number,
    timestamp: PropTypes.number
}).isRequired

function AuthorAvatar({ hash }) {
    const url = `https://www.gravatar.com/avatar/${hash}`
    return (
        <Avatar src={url} alt="avatar" size="large" className="avatar" style={{ 'marginRight': '10px' }} />
    )
}

Avatar.propTypes = {
    hash: PropTypes.string
}
function Message({ text }) {
    return (
        <div className="message">
            {text}
        </div>
    )
}

Message.propTypes = {
    text: PropTypes.string
}

function Author({ author }) {
    return (
        <span className="author">
            <span className="name">{author.name}</span>
            <span className="handle">@{author.handle}</span>
        </span>
    )
}

Author.propTypes = {
    author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        handle: PropTypes.string.isRequired
    }).isRequired
}

const Time = ({ time }) => {
    const timeString = moment(time).fromNow();
    return <span className="time">{timeString}</span>;
}

Time.propTypes = {
    time: PropTypes.number
}

const ReplyButton = () => (
    <Button className="reply-button">
        <i className="fa fa-reply"></i>
    </Button>
);

function getRetweetCount(count) {
    if (count > 0) {
        return <span className="retweet-count">{count}</span>;
    } else {
        return null;
    }
}

const RetweetButton = ({ count }) => (
    <Button className="retweet-button">
        <i className="fa fa-retweet"></i>
        {getRetweetCount(count)}
    </Button>
);

RetweetButton.propTypes = {
    count: PropTypes.number
}


const LikeButton = ({ count }) => (
    <Button className="like-button">
        <i className="fa fa-heart"></i>
        {count > 0 && <span className="like-count">{count}</span>}
    </Button>
);
const MoreOptionsButton = () => (
    <Button className="more-options-button">
        <i className="fa fa-ellipsis-h"></i>
    </Button>
);

LikeButton.propTypes = {
    count: PropTypes.number
}

const person1 = {
    firstName: 'Tim',
    lastName: 'Copland',
    addressLine1: '123 Fake St',
    city: 'Boston',
    state: 'MA',
    postcode: '02118'
}

const person2 = {
    firstName: 'Nina',
    lastName: 'Wan',
    addressLine1: '21 David St',
    city: 'Richmond',
    state: 'VIC',
    postcode: '3121'
}

function AddressLabel({ person }) {
    const { firstName, lastName, addressLine1, city, state, postcode } = person;
    return (
        <div>
            {firstName} {lastName}<br />
            {addressLine1}<br />
            {city} {state} {postcode}
        </div>
    );
}

const personPropType = PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    addressLine1: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    postcode: PropTypes.string
})

AddressLabel.propTypes = {
    person: personPropType
}

function Envelope({from, to}) {
    return (
        <Card className="envelope">
            <CardContent>
                <AddressLabel person={to} />
            </CardContent>
            <CardHeader style={{textAlign:'center'}}>
                <AddressLabel person={from} />
            </CardHeader>
        </Card>
    )
}

Envelope.propTypes = {
    from: personPropType,
    to: personPropType
}



ReactDOM.render(<Tweet tweet={testTweet} />, document.querySelector('#root'));