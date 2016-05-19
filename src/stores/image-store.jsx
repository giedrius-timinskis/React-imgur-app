// Will retreive Imgur images based on given topic id
var Reflux = require('reflux');
var Api = require('../utils/api');
var Actions = require('../actions');
var _ = require('underscore');

module.exports = Reflux.createStore({
    listenables: [Actions],
    getImages: function (topicId) {
        Api.get('topics/' + topicId)
            .then(function(json) {
                // Remove any image that is an album
                this.images = _.reject(json.data, function (image) {
                    return image.is_album
                });

                this.triggerChange();
            }.bind(this));
    },
    triggerChange: function () {
        this.trigger('change', this.images);
    },
    find: function (id) {
        var image = _.findWhere(this.images, {id: id});

        if (image) {
            return image
        } else {
            this.getImage(id);
            return null;
        }
    },
    getImage: function (id) {
        Api.get('gallery/image/' + id)
            .then(function(json) {
                if (this.images) {
                    this.images.push(json.data);
                } else {
                    this.images = [json.data];
                }

                this.triggerChange();
            }.bind(this));
    }
})
