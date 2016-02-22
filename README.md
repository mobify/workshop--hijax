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

    <img src="https://raw.githubusercontent.com/mobify/workshop--hijax/step-4-parsers-and-components/static/img/comments-mock.png?token=AKTX6hucqVA6zcvci1B4gEBpCtiNG2wkks5W1Il1wA%3D%3D" height="400" />

8. To stop the preview, enter `[control] c` on the command line.

##Ready for The Next Step?

Sorry that's it, we're all done. To see the final product continue to the completed-workshop branch.

```
git reset --hard HEAD && git clean -df && git checkout [completed-workshop](https://github.com/mobify/workshop--hijax/blob/completed-workshop/README.md)
```
