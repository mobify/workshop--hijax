define([
    '$',
    'global/baseView',
    'dust!pages/pdp/template'
],
function($, BaseView, template) {
    return {
        template: template,
        extend: BaseView,

        context: {
            templateName: 'pdp',
            comments: function() {
                return $('.comments');
            }
        }
    };
});
