var React = require('react');
var Header = require('./header');
var TopicList = require('./topic-list')

module.exports = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                {this.content()}
            </div>
        )
    },
    content: function() {
        if (this.props.children) { // Router stuff, show children if not viewing topic list
            return this.props.children;
        } else {
            return <TopicList />
        }
    }
})
