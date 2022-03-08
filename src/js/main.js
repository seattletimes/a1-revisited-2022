// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

const $ = require('jquery');
require('waypoints/lib/noframework.waypoints.min');

function makeVideoWaypoints(myVids) {
  $('.scroll-blocks .block').each((index, element) => {

          $(element).ready(function() {
            var player = this;

            new Waypoint({
                element: element,
                enabled: false,
                handler: function(direction) {
                  if(direction === "down") {

                  }
                  else if (direction === "up") {

                  }
                },
                offset: '80%'
            });

            new Waypoint({
                element: element,
                enabled: false,
                handler: function(direction) {
                  if(direction === "down") {

                    }, 1000);
                  }
                  else if (direction === "up") {
                  }
                },
                offset: '-20%'
            });


          });

          });

          // setTimeout(function(){
          //   Waypoint.enableAll();
          // }, 250);
      };
