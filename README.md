#Step 4: Add a Parser and Component for the Comments

Now that we're able to intercept the desktop site's AJAX call we can transform the markup for comments to fit our designs. We'll use components and parsers to better organize the code within the project.

Parsers can be used to break up markup into smaller pieces to be used within a partial template file. 

Components are HTML and CSS (sometimes JavaScript too) files that can be used accross the site. In this case the comments component that we're creating could be used on another page as well.


### Install NPM Modules

1. In your `workshop--hijax` project folder, enter the following command to install NPM modules:

    ```
    npm install
    ```

##Task

###Add The Comment Component

1. Add a folder called `comment` under `app/components`
2. Within the `app/components/comment` folder add a file called `comment.dust` with the following content:

    ```
    <div class="c-comment">
        {#content}
            <div class="c-comment__rating">{rating}</div>
            <h3>{title}</h3>
            <span class="c-comment__author">{author}</span>

            <ul class="c-comment__stats">
                {#stats}
                    <li class="c-comment__stat">{.}</li>
                {/stats}
            </ul>

            <div class="c-comment__body">{body}</div>
        {/content}
    </div>
    ```

3. Still within the folder add a file called `_style.scss` with the following content:

    ```
    .c-comment {
        margin: $v-space $h-space;
        padding: $v-space 0;
        border-top: 1px solid $grey-90;
    }

    .c-comment__title {
        margin: $v-space 0;

        font-family: $sans-serif;
    }

    .c-comment__author {
        font-style: italic;
    }

    .c-comment__stats {
        padding: $v-space 0;
    }

    .c-comment__stat {
        font-size: $small-font-size;
    }
    ```

4. In the `app/global/styles/_components.scss` file add the following line:

    ```
    @import 'components/comment/style';
    ```

5. Save all the new files


###Add A Comment Parser

1. Add a folder called `parsers` under `app/pages/pdp`
2. Within the folder `app/pages/pdp` add a file called `comment.js` with the following content:

    ```
    define([
        '$'
    ], function($) {
        var _parse = function($comment) {
            var comment = {
                rating: $comment.find('.rating').remove().text(),
                stats: $comment.find('td:nth-of-type(1) span').map(function() {
                    return $(this).text();
                }),
                title: $comment.find('h3').text(),
                author: $comment.find('td:nth-of-type(2) span').text(),
                body: $comment.find('td:nth-of-type(2) p').text()
            };

            return { content: comment };
        };

        return {
            parse: _parse
        };
    });
    ```

3. Save the new file


###Integrate with Hijax

1. In the `app/pages/pdp/view.js` file remove the comments key we added previously. We don't need it anymore.
2. In the `app/pages/pdp/template.dust` file update the contentBlock to the following:

    ```
    {<contentBlock}
        <div class="c-comments js-comments">
            <h2 class="t-pdp__heading">Comments</h2>
        </div>
    {/contentBlock}
    ```

3. In the `app/pages/pdp/ui.js` file include the parser and dust component files you just created:

    ```
    define([
        '$',
        'hijax',
        'pages/pdp/parsers/comment',
        'dust!components/comment/comment'
    ], function($, Hijax, CommentParser, CommentTemplate) {
        var pdpUI = function() {
    ```

4. Still in `app/pages/pdp/ui.js` update your hijax call to use the parser and dust component files:

    ```
    hijax.set('comments', '/comments.html', {
        receive: function(data, xhr) {
            var $data = $(data);
            var comments = $data.find('.comment').map(function() {
                var $comment = $(this);
                new CommentTemplate(CommentParser.parse($comment), function(err, html) {
                    $('.js-comments').append(html);
                });
            });
        }
    });
    ```

5. The final result for `app/pages/pdp/ui.js` should look like this:

    ```
    define([
        '$',
        'hijax',
        'pages/pdp/parsers/comment',
        'dust!components/comment/comment'
    ], function($, Hijax, CommentParser, CommentTemplate) {
        var pdpUI = function() {
            // Add any scripts you would like to run on the pdp page only here
            var hijax = new Hijax();
            hijax.set('comments', '/comments.html', {
                receive: function(data, xhr) {
                    var $data = $(data);
                    var comments = $data.find('.comment').map(function() {
                        var $comment = $(this);
                        new CommentTemplate(CommentParser.parse($comment), function(err, html) {
                            $('.js-comments').append(html);
                        });
                    });
                }
            });
        };

        return pdpUI;
    });
    ```

6. Back in the command line, enter the `grunt preview` command to start the browser preview.
7. Work through the [Preview your Project](http://adaptivejs.mobify.com/v1.0/docs/preview-your-project) tutorial.
    Use the `http://www.merlinspotions.com/potions/bulgeye-potion.html` URL for the site.

    The page should look like the mock. 

    *Page mock goes here*


    ![Page Mock](https://gm1.ggpht.com/asmnWST6Mx9l-gDqk5B6yUnqKiV5oN2iMpS5nt_M4W26rGWhZOl1y8OruXhNy3lToNLWpLCH1GxuUbXnMOkM24T-Ng7aJRyG7skYHk1U2oPqM7T2VK9o1mUS9xdUhze55cXsvXsAVZ8HKAOWyEaQY9N_nMQe-q5xAmbMuVPBpG-8hM40gr3ZALkukmj59vVbg9ijjnT-0R3dnOPqfd0GRuQDtDL2fJ2o2CqZ41tFnrHu0qVHcxp7g7dRH3mYnG052e0X_460aMmr1mnHH5wUdQM-LsuVAp7eZ7Uek2ka3229rYGSUjZkIcH3MrxS3jD4BAxEl8XOlHQMWqMOO7a8VE4YiaLT6wqeuPjJY4EORE1AgAXzQky0xCkm0OsXTPMuULNkbCTw7c6U2HYfWgUwVlGfgiTI_amHXuai1IPySNVfn2wkjk_iIymB--Cz2ltwMfYgH9L6tlqHQEdqi6kG2E28-UimEyKRIczGyqc6sLPRDLF5tskqNWNwY3QfvZNLCXU8H-LxLjLwwTp4VxXGb1C20qi-f4DdVtn1qiV1u494IKrXH5khJc_JOsBwVps6mG5PWYsx63XWHO2WQbJ6N-1w-5vIQgzTtvYqJSb2n0tKbdezxJH-V5stUPAYKmq1UICTZM3S1FZIkDcOXEGIP_Q0SVV4Z2b2OjwG9ZlYrK2DBA=w824-h1082-l75-ft)

8. To stop the preview, enter `[control] c` on the command line.

##Ready for The Next Step?

Sorry that's it, we're all done. To see the final product continue to the completed-workshop branch.

```
git reset --hard HEAD && git clean -df && git checkout completed-workshop
```
