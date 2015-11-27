define([
    '$',
    'adaptivejs/router',
    'pages/home/view',
    'pages/category/view'
],
function($, Router, Home, Category) {
    var router = new Router();

    router
        .add(Router.selectorMatch('body.home'), Home)
        .add(Router.selectorMatch('body.category'), Category)
        .add(Router.urlMatch('/foo'), Home)
        .add(function() {return true;}, Home);

    return router;
});
