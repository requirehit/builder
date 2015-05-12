'use strict';

var Class = require( 'findhit-class' ),
    Promise = require( 'bluebird' ),

    debug = require( 'debug' )( 'requirehit:builder' );

// -----------------------------------------------------------------------------

var Builder = Class.extend({

    options: {
        environment: 'development',
    },

    initialize: function ( options ) {
        this.setOptions( options );
    },

    build: function () {

        if (
            ( Util.isnt.Array( this.files ) || this.files.length === 0 ) ||
            ( Util.isnt.String( this.dirname ) || ! this.dirname )
        ) {
            throw new Error([
                "Seems that you didn't know how builder works?",
                "Here you have two options:",
                " - or you create your own build method;",
                " - or either you provide a .dirname and .files to be reduced",
            ].join( ' ' ));
        }

        Promise.all( this.files )

        // Check if they are strings
        .each(function ( file ) {
            if ( Util.isnt.String( file ) ) {
                throw new TypeError( 'each file on .files should be a String' );
            }
        })

        .reduce(function ( entire, part ) {
            return entire + '\n' + part;
        })
        .tap(function () {
            debug( ".files were built" );
        });
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
