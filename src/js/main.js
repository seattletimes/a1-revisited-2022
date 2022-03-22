// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

const $ = require('jquery');
require('waypoints/lib/noframework.waypoints.min');

const refundFreezeData = require('../../data/RefundsAndFreeze.sheet.json');
const tearsData = require('../../data/Tears.sheet.json');

// console.log(refundFreezeData);

var windowWidth = $('.scroll-blocks').width();
console.log(windowWidth);

var triggerFadeIn = windowWidth > 500 ? '60%' : '120%';

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
                offset: triggerFadeIn
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
    var tearsWidth = $('.secondSvg img').width();
    makeWayPoints();


    $( ".thirdSvg svg #allPopups rect" ).click(function() {
      var id = $(this).attr('id');
      $( ".thirdSvg svg #allPopups rect" ).removeClass('show');

      refundFreezeData.forEach(element => {
        if (element.svg === id) {
          $(this).addClass('show');

          var label = element.final_category
          var noSpaceKey = label.replace(/\s/g, '');
          noSpaceKey = noSpaceKey.replace(/[^a-zA-Z ]/g, "");

          $('refundsFreezesPopup').removeClass();
          $('#refundsFreezesPopup #refunds-label').removeClass();

          var top = $(this).attr('y');
          var left = $(this).attr('x') > 300 ? 300 : 100;
          left = tearsWidth > 500 ? left : 0;
          var ratio = tearsWidth / 733.1;

          $('#refundsFreezesPopup #refunds-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#refundsFreezesPopup .comment').empty().append(element.caption_popup);
          $('#refundsFreezesPopup').css("top", `${top * ratio}px`);
          $('#refundsFreezesPopup').css("left", `${left}px`);
          $('#refundsFreezesPopup').addClass('show');

        } else {}
      });
    });

    $( ".secondSvg svg rect" ).click(function(e) {
      var id = $(this).attr('id');
      $( ".secondSvg svg rect" ).removeClass('show');



      tearsData.forEach(element => {
        if (element.svg === id) {
          $(this).addClass('show');

          var label = element.final_category
          var noSpaceKey = label.replace(/\s/g, '');
          noSpaceKey = noSpaceKey.replace(/[^a-zA-Z ]/g, "");

          $('tearsPopup').removeClass();
          $('#tearsPopup #tears-label').removeClass();

          var gCon = $(this).closest( "g" );
          var object = gCon[0].getBoundingClientRect();
          console.log(object);

          var chosenRect = this.getBoundingClientRect();

          var top = $(this).attr('y');
          var left = $(this).attr('x') > 90 ? 300 : 100;
          left = tearsWidth > 500 ? left : 0;
          var height = $(this).attr('height');
          // var top = object.top;
          // var left = object.x;

          var ratio = tearsWidth / 194.3;

          // var left = e.clientX > (tearsWidth/2) ? (tearsWidth/2) : e.clientX;

          $('#tearsPopup #tears-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#tearsPopup .comment').empty().append(element.caption_popup);
          $('#tearsPopup').css("top", `${top * ratio}px`);
          $('#tearsPopup').css("left", `${left}px`);
          $('#tearsPopup').addClass('show');

        } else {}
      });
    });


    $( "#refundsFreezesPopup .close" ).click(function() {
      $('#refundsFreezesPopup').removeClass('show');
      $( ".thirdSvg svg #allPopups rect" ).removeClass('show');
    });

    $( "#tearsPopup .close" ).click(function() {
      $('#tearsPopup').removeClass('show');
      $( ".secondSvg svg rect" ).removeClass('show');
    });
});
