(function($) {
  "use strict"; // Start of use strict

  // Floating label headings for the contact form
  $("body").on("input propertychange", ".floating-label-form-group", function(e) {
    $(this).toggleClass("floating-label-form-group-with-value", !!$(e.target).val());
  }).on("focus", ".floating-label-form-group", function() {
    $(this).addClass("floating-label-form-group-with-focus");
  }).on("blur", ".floating-label-form-group", function() {
    $(this).removeClass("floating-label-form-group-with-focus");
  });

  // Show the navbar when the page is scrolled up
  var MQL = 992;

  //primary navigation slide-in effect
  if ($(window).width() > MQL) {
    var headerHeight = $('#mainNav').height();
    $(window).on('scroll', {
        previousTop: 0
      },
      function() {
        var currentTop = $(window).scrollTop();
        //check if user is scrolling up
        if (currentTop < this.previousTop) {
          //if scrolling up...
          if (currentTop > 0 && $('#mainNav').hasClass('is-fixed')) {
            $('#mainNav').addClass('is-visible');
          } else {
            $('#mainNav').removeClass('is-visible is-fixed');
          }
        } 
        else if (currentTop > this.previousTop) {
          //if scrolling down...
          $('#mainNav').addClass('is-visible');
          if (currentTop > headerHeight && !$('#mainNav').hasClass('is-fixed')) $('#mainNav').addClass('is-fixed');
        }
        this.previousTop = currentTop;
      });
  }

  // accordion js
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight){
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      } 
    });
  }

  // timer js
  var countDownDate = new Date("Apr 27, 2018 20:00:00").getTime();

  var countDownFunction = setInterval(function() {
      var now = new Date().getTime();

      var distance = countDownDate - now;

      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

      if(distance < 0) {
        clearInterval(countDownFunction);
        document.getElementById("demo").innerHTML = "Time to Choose Your Representatives!";
      }
      


  },1000);

function VerticalTimeline( element ) {
    this.element = element;
    this.blocks = this.element.getElementsByClassName("js-cd-block");
    this.images = this.element.getElementsByClassName("js-cd-img");
    this.contents = this.element.getElementsByClassName("js-cd-content");
    this.offset = 0.8;
    this.hideBlocks();
  };

  VerticalTimeline.prototype.hideBlocks = function() {
    //hide timeline blocks which are outside the viewport
    if ( !"classList" in document.documentElement ) {
      return;
    }
    var self = this;
    for( var i = 0; i < this.blocks.length; i++) {
      (function(i){
        if( self.blocks[i].getBoundingClientRect().top > window.innerHeight*self.offset ) {
          self.images[i].classList.add("cd-is-hidden"); 
          self.contents[i].classList.add("cd-is-hidden"); 
        }
      })(i);
    }
  };

  VerticalTimeline.prototype.showBlocks = function() {
    if ( ! "classList" in document.documentElement ) {
      return;
    }
    var self = this;
    for( var i = 0; i < this.blocks.length; i++) {
      (function(i){
        if( self.contents[i].classList.contains("cd-is-hidden") && self.blocks[i].getBoundingClientRect().top <= window.innerHeight*self.offset ) {
          // add bounce-in animation
          self.images[i].classList.add("cd-timeline__img--bounce-in");
          self.contents[i].classList.add("cd-timeline__content--bounce-in");
          self.images[i].classList.remove("cd-is-hidden");
          self.contents[i].classList.remove("cd-is-hidden");
        }
      })(i);
    }
  };

  var verticalTimelines = document.getElementsByClassName("js-cd-timeline"),
    verticalTimelinesArray = [],
    scrolling = false;
  if( verticalTimelines.length > 0 ) {
    for( var i = 0; i < verticalTimelines.length; i++) {
      (function(i){
        verticalTimelinesArray.push(new VerticalTimeline(verticalTimelines[i]));
      })(i);
    }

    //show timeline blocks on scrolling
    window.addEventListener("scroll", function(event) {
      if( !scrolling ) {
        scrolling = true;
        (!window.requestAnimationFrame) ? setTimeout(checkTimelineScroll, 250) : window.requestAnimationFrame(checkTimelineScroll);
      }
    });
  }

  function checkTimelineScroll() {
    verticalTimelinesArray.forEach(function(timeline){
      timeline.showBlocks();
    });
    scrolling = false;
  };




})(jQuery); // End of use strict
