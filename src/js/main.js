// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

const $ = require('jquery');
require('waypoints/lib/noframework.waypoints.min');

const refundFreezeData = require('../../data/RefundsAndFreeze.sheet.json');
const tearsData = require('../../data/Tears.sheet.json');

console.log(refundFreezeData);

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
          var left = $(this).attr('x');

          $('#refundsFreezesPopup #refunds-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#refundsFreezesPopup .comment').empty().append(element.caption_popup);
          $('#refundsFreezesPopup').css("top", `${top}px`);
          $('#refundsFreezesPopup').css("left", `${left / 2}px`);
          $('#refundsFreezesPopup').addClass('show');

        } else {}
      });
    });

    $( ".secondSvg svg rect" ).click(function() {
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

          var object = this.getBoundingClientRect();
          console.log(object);

          // var top = $(this).attr('y');
          // var left = $(this).attr('x');
          var top = object.top;
          var left = object.x;

          $('#tearsPopup #tears-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#tearsPopup .comment').empty().append(element.caption_popup);
          $('#tearsPopup').css("top", `${top}px`);
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
