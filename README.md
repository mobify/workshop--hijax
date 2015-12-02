#Step 1: Generate the PDP View

For this workshop we'll be starting work on the PDP for merlins potions. We'll be picking up where the [Adaptive.js Site Workshop](https://github.com/mobify/workshop--adaptivejs-site) left off.

### Install NPM Modules

1. In your `workshop--hijax` project folder, enter the following command to install NPM modules:

    ```
    npm install
    ```

##Task

###Create a New 'pdp' View

1. In your `workshop--hijax` project folder, enter the following command to run the sub-generator with Yeoman:

    ```
    yo adaptivejs:view
    ```

2. When the generator prompts you for a name, enter `pdp`.
3. Select `baseView` as the view to extend.
![View Generator](https://raw.githubusercontent.com/mobify/workshop--hijax/step-1-generate-pdp-view/static/img/view-generator.png)

4. To add the view to the router file, open the file `app/global/router.js` with a text editor.
5. In `router.js` file, in the `define` dependencies array code block, add the new `pages/pdp/view` path for the new view file. Remember to append a comma the previous `page/category/view` last entry.


6. In the function definition, list the view `PDP` as an argument after the `Category` argument. Remember to append the comma after `Category`.


7. Add another .add() function call to the router for the new PDP:

    ```javascript
    router
        .add(Router.selectorMatch('body.home'), Home)
        .add(Router.selectorMatch('body.category'), Category)
        .add(Router.selectorMatch('body.pdp'), PDP);
    ```

    The `.add()` function creates a new route that loads the given view upon the return of a Boolean value from the function. The `Router.selectorMatch()` function returns true when an element that matches the selector exists on the current page.

8. Save the `router.js` file with these changes in your editor.
9. Back in the command line, enter the `grunt preview` command to start the browser preview.
10. Work through the [Preview your Project](http://adaptivejs.mobify.com/v1.0/docs/preview-your-project) tutorial.
    Use the `http://www.merlinspotions.com/potions/bulgeye-potion.html` URL for the site.

    A page with just the sites header and footer will appear.

11. To stop the preview, enter `[control] c` on the command line.

##Continue to Step 2

When you're ready to continue to Step 2, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-2-add-comments
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--hijax/blob/step-2-add-comments/README.md) for the Step 2 branch.