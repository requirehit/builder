
function Builders () {
}

module.exports = Builders;

Builders.prototype = Object.create( Array.prototype );

Builders.prototype.build = function () {
    return Promise.all( this )
    .reduce(function ( entire, part ) {
        return entire + part;
    });
};
