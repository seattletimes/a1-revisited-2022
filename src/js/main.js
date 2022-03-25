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
var extra = (windowWidth > 600) ? 250 : 700;
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
    console.log(tearsWidth);

    makeWayPoints();

    $( '.thirdSvg svg' ).ready(function() {
    $( ".thirdSvg svg #allPopups rect" ).click(function() {
      var id = $(this).attr('id');
      $( ".thirdSvg svg #allPopups rect" ).removeClass('show');

      refundFreezeData.forEach(element => {
        if (element.svg === id) {
          $(this).addClass('show');

          var labelRefund = element.final_category
          var noSpaceKeyRefund = labelRefund.replace(/\s/g, '');
          noSpaceKeyRefund = noSpaceKeyRefund.replace(/[^a-zA-Z ]/g, "");

          $('refundsFreezesPopup').removeClass();
          $('#refundsFreezesPopup #refunds-label').removeClass();

          var ratioRefund = tearsWidth / 733;
          var topRefund = $(this).attr('y');
          var leftRefund = $(this).attr('x') > 300 ? ($(this).attr('x') * ratioRefund) : 20;
          leftRefund = tearsWidth > 500 ? leftRefund : 0;

          var heightRefund = $(this).attr('height');

          var offsetTop_Refund = ((topRefund * ratioRefund) + ((parseFloat(heightRefund) + 25) * ratioRefund));

          $('#refundsFreezesPopup #refunds-label').addClass(`${noSpaceKeyRefund}`).empty().append(element.final_category);
          $('#refundsFreezesPopup .comment').empty().append(element.caption_popup);
          $('#refundsFreezesPopup').css("top", `${offsetTop_Refund}px`);
          $('#refundsFreezesPopup').css("left", `${leftRefund}px`);
          $('#refundsFreezesPopup').addClass('show');

        } else {}
      });
    });
  });

$( '.secondSvg img' ).ready(function() {
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

          var chosenRect = this.getBoundingClientRect();

          var top = $(this).attr('y');
          var left = $(this).attr('x') > 90 ? 300 : 100;
          left = tearsWidth > 500 ? left : 0;
          var height = $(this).attr('height');
          // var top = object.top;

          // var left = object.x;

          var ratio = tearsWidth / 194.3;

          var offsetTop = (top * ratio) + ((parseFloat(height) + 1) * ratio);

          // var left = e.clientX > (tearsWidth/2) ? (tearsWidth/2) : e.clientX;

          $('#tearsPopup #tears-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
          $('#tearsPopup .comment').empty().append(element.caption_popup);
          $('#tearsPopup').css("top", `${offsetTop}px`);
          $('#tearsPopup').css("left", `${left}px`);
          $('#tearsPopup').addClass('show');

        } else {}
      });
    });
});

$( '.fourthSvg img' ).ready(function() {
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
            var top_ratio = tearsWidth / 754.90002;

            var offsetTop_Top = (top_top * top_ratio) + (parseFloat(height_top) * top_ratio);

            $('#topPopup #top-label').addClass(`${noSpaceKey}`).empty().append(element.final_category);
            $('#topPopup .comment').empty().append(element.caption_popup);
            $('#topPopup').css("top", `${offsetTop_Top}px`);
            $('#topPopup').css("left", `${left_top}px`);
            $('#topPopup').addClass('show');

          } else {}
        });
      });

var firstCall = $( '#allStories' ).find('.story[data-id="top"]').height() + extra;
$('#allStories').height(firstCall + 'px');
console.log(firstCall + "px");
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

    $( "button.redact" ).click(function() {
      $( "button.redact span" ).toggleClass( "show" );

      $(this).closest( ".example" ).find('.example_image').toggleClass('show');
    });


    $( ".buttonCon button" ).click(function() {
      $( ".buttonCon button" ).removeClass('show');
      $( ".story" ).removeClass('show');
      $( this ).addClass('show');
      var findID = $( this).data('id');
      $( '#allStories' ).find(`.story[data-id='${findID}']`).addClass('show');
      var storyHeight = $( '#allStories' ).find(`.story[data-id='${findID}']`).height();
      var setHeight = (findID === "top") ? (storyHeight + extra) : storyHeight;
      $('#allStories').height(setHeight + "px");
    });
});
