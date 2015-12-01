define(['$', 'hijax'], function($, Hijax) {
    var pdpUI = function() {
        var hijax = new Hijax();
        hijax.set('comments', '/comments.html', {
            receive: function(data, xhr) {
                console.log(data);
            }
        });
    };

    return pdpUI;
});
