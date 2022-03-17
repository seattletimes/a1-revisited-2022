// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

const $ = require('jquery');
require('waypoints/lib/noframework.waypoints.min');

function makeWayPoints() {
  $('.scroll-blocks .block').each((index, element) => {

          $(element).ready(function() {
            var player = this;

            new Waypoint({
                element: element,
                enabled: true,
                handler: function(direction) {
                  var classList = $(element).attr("class").split(' ')[1];
                  if(direction === "down") {
                    $(`.svg svg #${classList}`).find( "rect" ).addClass("show");
                    $(`.svg svg #${classList}`).find( "text" ).addClass("show");
                  }
                  else if (direction === "up") {
                  }
                },
                offset: '60%'
            });

            new Waypoint({
                element: element,
                enabled: true,
                handler: function(direction) {
                  var classList = $(element).attr("class").split(' ')[1];
                  if(direction === "down") {
                  }
                  else if (direction === "up") {
                    $(`.svg svg #${classList}`).find( "rect" ).removeClass("show");
                    $(`.svg svg #${classList}`).find( "text" ).removeClass("show");
                  }
                },
                offset: '95%'
            });

          });

    });
};

$( document ).ready(function() {
    makeWayPoints();
});
