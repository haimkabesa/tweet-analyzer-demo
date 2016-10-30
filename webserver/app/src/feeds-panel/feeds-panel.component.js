"use strict";
var FeedsPanelComponent = (function () {
    function FeedsPanelComponent(socket) {
        var _this = this;
        this.socket = socket;
        var labelsList = ["Negative", "Neutral", "Positive"];
        this.count = [0, 0, 0];
        this.chart = {
            labels: labelsList,
            data: this.count,
            options: {
                yAxisMinimumInterval: 1
            }
        };
        this.feeds = [];
        socket.connect();
        socket.on('newFeed', function (feed) {
            if (_this.config.topic === feed.topic) {
                _this.feeds.unshift(feed);
                // console.log("feed added");
                ++_this.chart.data[feed.aggregateSentiment + 1];
            }
        });
    }
    return FeedsPanelComponent;
}());
exports.FeedsPanelComponent = FeedsPanelComponent;
