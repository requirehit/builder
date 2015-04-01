'use strict';

var Class = require( 'findhit-class' ),
    debug = require( 'debug' )( 'requirehit:builder' );

// -----------------------------------------------------------------------------

var Builder = Class.extend({

    options: {

        env: 'development',

    },

    initialize: function ( options ) {
        this.setOptions( options );
    },

    build: function () {
        throw new Error( "you should create your own .build method" );
    },

});

Builder.addInitHook(function () {
    var instance = this,
        prototype = this.__proto__,
        constructor = this.constructor;

    if ( constructor === Builder ) {
        throw new TypeError([
            "You shouldn't create instances directly from Builder.",
            "Please create your own Builder class by extending it.",
        ].join(' '));
    }

    // Check if developer has provided it own name
    if ( typeof prototype.name !== 'string' ) {
        throw new TypeError([
            "You must set your builder name on your own Builder.prototype.name",
        ].join(' '));
    }

    debug( "initializing a builder from Builder.%s", prototype.name );
});

module.exports = Builder;
