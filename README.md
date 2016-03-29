#Step 2: Add Comments to the PDP

In order to demonstrate how Hijax, parsers and components work, we'll be adding the comments section to the PDP. The comments section should look like this:

<img src="https://github.com/mobify/workshop--hijax/blob/step-4-parsers-and-components/static/img/comments-mock.png?raw=true" height="400" />


### Install NPM Modules

1. In your `workshop--hijax` project folder, enter the following command to install NPM modules:

    ```
    npm install
    ```

##Task

###Add Comments to the PDP

1. In the `pages/pdp/view.js` file replace the `body` key with the following:

    ```
    comments: function() {
        return $('.comment');
    }
    ```

2. In the `pages/pdp/template.dust` file add the comments key to the content block:

    ```
    {<contentBlock}
        {comments}
    {/contentBlock}
    ```
3. Save the two files.
4. Back in the command line, enter the `grunt preview` command to start the browser preview.
5. Work through the [Preview your Project](http://adaptivejs.mobify.com/v1.0/docs/preview-your-project) tutorial.
    Use the `http://training.merlinspotions.com/potions/bulgeye-potion.html` URL for the site.

    A page with just the sites header and footer will appear.

    If you look closer at the desktop site, you'll see that the comments are being loaded in by AJAX. This means that we won't be able to add them to the page the same way we normally would.

6. In the `pages/pdp/view.js` file update the comments selector to the following:

    ```
    comments: function() {
        return $('.comments');
    }
    ```

7. Save the view file.
8. Back in the command line, enter the `grunt preview` command to start the browser preview.
9. Work through the [Preview your Project](http://adaptivejs.mobify.com/v1.0/docs/preview-your-project) tutorial.
    Use the `http://training.merlinspotions.com/potions/bulgeye-potion.html` URL for the site.

    The page will now contain comments layed out in a table. The current layout won't work with the design for the page, but we'll address that in the next few steps.

10. To stop the preview, enter `[control] c` on the command line.

##Continue to Step 3

When you're ready to continue to Step 3, run the following command:

```
git reset --hard HEAD && git clean -df && git checkout step-3-integrate-hijax
```

Then, follow the directions in the [README](https://github.com/mobify/workshop--hijax/blob/step-3-integrate-hijax/README.md) for the Step 3 branch.
