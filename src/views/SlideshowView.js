/*** EmptyView ***/

// define this module in Require.JS
define(function(require, exports, module) {

    // Import additional modules to be used in this view 
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    var SlideView = require('views/SlideView');
    var LightBox = require('famous/views/Lightbox');
    var Easing = require('famous/transitions/Easing');

    // Constructor function for our EmptyView class
    function SlideshowView() {

        // Applies View's constructor function to EmptyView class
        View.apply(this, arguments);

        this.rootModifier = new StateModifier({
            align:[0.5,0],
            origin:[0.5,0],
            size:this.options.size,
        });

        this.mainNode = this.add(this.rootModifier);
        _createLightbox.call(this);
        _createSlides.call(this);
    }

    // Establishes prototype chain for EmptyView class to inherit from View
    SlideshowView.prototype = Object.create(View.prototype);
    SlideshowView.prototype.constructor = SlideshowView;

    // Default options for EmptyView class
    SlideshowView.DEFAULT_OPTIONS = {
        size: [400,450],
        lightboxOpts: {
            inOpacity: 1,
            outOpacity: 0,
            inOrigin: [0, 0],
            outOrigin: [0, 0],
            showOrigin: [0, 0],
            // Transform.thenMove() first applies a transform then a
            // translation based on [x, y, z]
            inTransform: Transform.thenMove(Transform.rotateX(0.9), [0, -300, -300]),
            outTransform: Transform.thenMove(Transform.rotateZ(0.7), [0, window.innerHeight, -1000]),
            inTransition: { duration: 650, curve: 'easeOut' },
            outTransition: { duration: 500, curve: Easing.inCubic }           

        }
    };

    // Define your helper functions and prototype methods here
    SlideshowView.prototype.showCurrentSlide = function(){
        this.ready = false;
        var slide = this.slides[this.currentIndex];
        this.lightbox.show(slide, function(){
            this.ready = true;
            slide.fadeIn();
        }.bind(this));
    }
    SlideshowView.prototype.showNextSlide = function () {
        if (!this.ready) return;
        this.currentIndex++;
        if(this.currentIndex === this.slides.length) this.currentIndex = 0;
        this.showCurrentSlide();
    }
    function _createLightbox(){
        this.lightbox = new LightBox(this.options.lightboxOpts);
        this.mainNode.add(this.lightbox);
    }
    function _createSlides(){
        this.slides = [];
        this.currentIndex = 0;

        for( var i = 0; i< this.options.data.length; i++){
            var slide = new SlideView({
                size: this.options.size,
                photoUrl: this.options.data[i]
            });

            this.slides.push(slide);

            slide.on('click', this.showNextSlide.bind(this));
        }

        this.showCurrentSlide();
    }
    module.exports = SlideshowView;
});





