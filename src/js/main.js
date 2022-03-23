// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

const $ = require('jquery');
require('waypoints/lib/noframework.waypoints.min');

const refundFreezeData = require('../../data/RefundsAndFreeze.sheet.json');
const tearsData = require('../../data/Tears.sheet.json');
const topData = require('../../data/Top.sheet.json');

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

          var labelRefund = element.final_category
          var noSpaceKeyRefund = labelRefund.replace(/\s/g, '');
          noSpaceKeyRefund = noSpaceKeyRefund.replace(/[^a-zA-Z ]/g, "");
          console.log(noSpaceKeyRefund);

          $('refundsFreezesPopup').removeClass();
          $('#refundsFreezesPopup #refunds-label').removeClass();

          var topRefund = $(this).attr('y');
          var leftRefund = $(this).attr('x') > 300 ? 300 : 100;
          leftRefund = tearsWidth > 500 ? leftRefund : 0;
          var ratioRefund = tearsWidth / 733.1;
          var heightRefund = $(this).attr('height');

          var offsetTop = ((topRefund * ratioRefund * 1.07) + (parseFloat(heightRefund) * ratioRefund * 1));

          $('#refundsFreezesPopup #refunds-label').addClass(`${noSpaceKeyRefund}`).empty().append(element.final_category);
          $('#refundsFreezesPopup .comment').empty().append(element.caption_popup);
          $('#refundsFreezesPopup').css("top", `${offsetTop}px`);
          $('#refundsFreezesPopup').css("left", `${leftRefund}px`);
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

          var offsetTop = (top * ratio) + ((parseFloat(height) + 1) * ratio);

          console.log(offsetTop);

          // var left = e.clientX > (tearsWidth/2) ? (tearsWidth/2) : e.clientX;

          $('#tearsPopup #tears-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#tearsPopup .comment').empty().append(element.caption_popup);
          $('#tearsPopup').css("top", `${offsetTop}px`);
          $('#tearsPopup').css("left", `${left}px`);
          $('#tearsPopup').addClass('show');

        } else {}
      });
    });

      $( ".fourthSvg svg rect" ).click(function(e) {
        var id = $(this).attr('id');
        $( ".fourthSvg svg rect" ).removeClass('show');
        topData.forEach(element => {
          if (element.svg === id) {
            $(this).addClass('show');

            var label = element.final_category;
            var noSpaceKey = label.replace(/\s/g, '');
            noSpaceKey = noSpaceKey.replace(/[^a-zA-Z ]/g, "");

            $('#topPopup').removeClass();
            $('#topPopup #top-label').removeClass();
            var chosenRect = this.getBoundingClientRect();

            var top_top = $(this).attr('y');
            var left_top = $(this).attr('x') > 90 ? 300 : 100;
            left_top = tearsWidth > 500 ? left_top : 0;
            var height_top = $(this).attr('height');
            console.log(height_top);
            // var top = object.top;

            // var left = object.x;

            var top_ratio = tearsWidth / 650;

            var offsetTop_Top = (top_top * top_ratio);

            $('#topPopup #top-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
            $('#topPopup .comment').empty().append(element.caption_popup);
            $('#topPopup').css("top", `${offsetTop_Top}px`);
            $('#topPopup').css("left", `${left_top}px`);
            $('#topPopup').addClass('show');

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

    $( "#topPopup .close" ).click(function() {
      $('#topPopup').removeClass('show');
      $( ".fourthSvg svg rect" ).removeClass('show');
    });

    $( ".buttonCon button" ).click(function() {
      $( ".buttonCon button" ).removeClass('show');
      $( ".story" ).removeClass('show');
      $( this ).addClass('show');
      var findID = $( this).data('id');
      $( '#allStories' ).find(`.story[data-id='${findID}']`).addClass('show');
      var setHeight = $( '#allStories' ).find(`.story[data-id='${findID}']`).height();
      $('#allStories').height(setHeight);



    });
});
