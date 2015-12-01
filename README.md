#Step 3: Integrate Hijax

In order to style the comments correctly we'll need to intercept the AJAX request that the desktop site is making.


### Install NPM Modules

1. In your `workshop--hijax` project folder, enter the following command to install NPM modules:

    ```
    npm install
    ```

##Task

###Add Hijax Plugin

1. In the `bower.json` file add the following:

    ```
    "hijax": "0.2.0"
    ```

    Make sure you add a comma on the end of the previous line.

2. Back in the command line, enter `bower install`
3. In `app/config/ui.js` hook up "hijax" by adding the following line:

    ```
    'hijax': 'bower_components/hijax/dist/hijax'
    ```
    Make sure you add a comma on the end of the previous line.


4. In `pdp/ui.js`, add "hijax" to the list of dependencies and pass it in under the variable Hijax:

    ```
    define(['$', 'hijax'], function($, Hijax) {
        var pdpUI = function() {
            // Add any scripts you would like to run on the pdp page only here
        };

        return pdpUI;
    });
    ```

5. Still in `pdp/ui.js` write a basic Hijax call within the pdpUI function:

    ```
    var hijax = new Hijax();
    hijax.set('comments', '/comments.html', {
        receive: function(data, xhr) {
            console.log(data);
        }
    }); 
    ```

6. In the `app/ui.js` file add pdp ui file to the dependency list and pass it as an argument to the main function:

    ```
    /**
     * Scripts required here will be combined into ui.js
     */

    require([
        'global/ui',
        'pages/home/ui'
        'pages/pdp/ui'
    ],
    function(
        globalUI,
        home,
        pdpUI
    ) {

        // This file gets pre-loaded so we dont' want to explicitly execute
        //  anything here. Instead we will wait for a require statement run
        //  in our template

    }, null, true); // relPath, forceSync
    ```

7. Back in the command line, enter the `grunt preview` command to start the browser preview.
8. Work through the [Preview your Project](http://adaptivejs.mobify.com/v1.0/docs/preview-your-project) tutorial.
    Use the `http://www.merlinspotions.com/potions/bulgeye-potion.html` URL for the site.

    Open your browsers inspector and view the console. You'll see the console.log statement we just added that will contain the data from the desktop site's AJAX call.

9. To stop the preview, enter `[control] c` on the command line.

##Continue to Step 4

When you're ready to continue to Step 4, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-4-parsers-and-components
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--hijax/blob/step-4-parsers-and-components/README.md) for the Step 4 branch.