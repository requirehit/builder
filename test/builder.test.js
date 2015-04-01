var Builder = require( '../lib/builder' ),

    chai = require( 'chai' ),
    expect = chai.expect;

// -----------------------------------------------------------------------------

describe( 'Builder', function () {

    // ----- classes definition -----

    var GoodBuilder = Builder.extend({
        name: 'GoodBuilder',

        options: {
            emptyBuild: true,
        },

        build: function () {
            return this.options.emptyBuild ? '' : 'something';
        },

    });

    var BadBuilder = Builder.extend({

        ownmethod: function () {
            return 'test';
        },

    });

    // ----- tests -----

    it( "should have BadBuilder.prototype.ownmethod", function () {
        expect( typeof BadBuilder.prototype.ownmethod ).to.be.equal( 'function' );
        expect( BadBuilder.prototype.ownmethod() ).to.be.equal( 'test' );
    });

    it( "should NOT throw an error when extended does have .name definition", function () {
        expect(function () {
            new GoodBuilder();
        }).to.not.throw( TypeError );
    });

    it( "should throw an error when extended doesn't have .name definition", function () {
        expect(function () {
            new BadBuilder();
        }).to.throw( TypeError );
    });

});
