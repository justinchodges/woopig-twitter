(function() {
    let hasTwitterEmbeds = false;
    const postLinks = document.querySelectorAll('.post a');
    const twitterLinks = [];

    if (!postLinks || postLinks.length === 0) return;

    for (let i = 0; i < postLinks.length; i++) {
        let postLinkHref = postLinks[i].getAttribute('href');

        if (postLinkHref && postLinkHref !== '') {
            if (
                postLinkHref.indexOf('//twitter.com/') >= 0
                || postLinkHref.indexOf('//mobile.twitter.com/') >= 0
                || postLinkHref.indexOf('//t.co/') >= 0
            ) {
                twitterLinks.push(postLinks[i]);
            }
        }
    }

    if (twitterLinks.length === 0) return;

    buildTwitterEmbed(0);

    function addTwitterWidget() {
        if (hasTwitterEmbeds) {
            let twitterWidget = document.createElement('script');
            twitterWidget.setAttribute('src', 'https://platform.twitter.com/widgets.js');
            twitterWidget.setAttribute('async', true);
            twitterWidget.setAttribute('charset', 'utf-8');
            document.body.appendChild(twitterWidget);
        }
    }

    function buildTwitterEmbed(i) {
        if (typeof twitterLinks[i] === 'undefined') {
            addTwitterWidget();
            return;
        }

        let link = twitterLinks[i];
        let href = link.getAttribute('href');

        // replace links for mobile Twitter or www with main domain

        href = href.replace('//mobile.', '//').replace('//www.', '//');

        if (href.indexOf('//twitter.com/') >= 0) {
            // twitter is found in link, build twitter embed

            hasTwitterEmbeds = true;
            let twitterEmbed = document.createElement('blockquote');
            twitterEmbed.classList.add('twitter-tweet');
            twitterEmbed.innerHTML = '<a href="' + href + '">' + href + '</a>';
            link.replaceWith(twitterEmbed);
            buildTwitterEmbed(i + 1);
        } else if (href.indexOf('//t.co/') >= 0) {
            // get full length Twitter URL of post, then build twitter embed

            fetch(href)
                .then(response => response.text())
                .then(data => {
                    var responseContainer = document.createElement('div');
                    responseContainer.innerHTML = data;
                    var newHref = responseContainer.querySelector('title').innerText;

                    if (newHref) {
                        hasTwitterEmbeds = true;
                        var twitterEmbed = document.createElement('blockquote');
                        twitterEmbed.classList.add('twitter-tweet');
                        twitterEmbed.innerHTML = '<a href="' + newHref + '">' + newHref + '</a>';
                        link.replaceWith(twitterEmbed);
                    }

                    buildTwitterEmbed(i + 1);
                })
                .catch(() => {
                    buildTwitterEmbed(i + 1);
                });
        } else {
            buildTwitterEmbed(i + 1);
        }
    }
})();
