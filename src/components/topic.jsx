var React = require('react');
var Reflux = require('reflux');

var ImageStore = require('../stores/image-store');
var Actions = require('../actions');
var ImagePreview = require('./image-preview');

module.exports = React.createClass({
    mixins: [
        Reflux.listenTo(ImageStore, 'onChange')
    ],
    getInitialState: function () {
        return {
            images: []
        }
    },
    componentWillMount: function() {
        // Get data for topics/defaults, set state to the topics we retrieve
        Actions.getImages(this.props.params.id);
    },
    componentWillReceiveProps: function (nextProps) {
        // This is called whenver the component receives a new set of properties
        // componentWillMount will not work because its only called once
        Actions.getImages(nextProps.params.id); // Pass in the topic id to get images
    },
    render: function () {
        return (
            <div className="topic">
                {/*This gets the URL param through router! - {this.props.params.id}*/}
                {this.renderImages()}
            </div>
        )
    },
    onChange: function (event, images) {
        this.setState({images: images})
    },
    renderImages: function () {
        return this.state.images.slice(0, 20).map(function(image) {
            return (
                <ImagePreview key={image.id} {...image}>
                </ImagePreview>
            )
        });
    }
})
