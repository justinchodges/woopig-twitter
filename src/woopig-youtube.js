(function() {
    const youtubeLinks = [];
    const youtubeLinksCommon = document.querySelectorAll('a[href*="youtube.com"]');
    const youtubeLinksShort = document.querySelectorAll('a[href*="youtu.be"]');

    youtubeLinksCommon.forEach((link) => {
        youtubeLinks.push(link);
    });

    youtubeLinksShort.forEach((link) => {
        youtubeLinks.push(link);
    });

    youtubeLinks.forEach((link) => {
        let url = new URL(link.href);
        let v;

        if (url.hostname.indexOf('youtube.com') >= 0) {
            v = url.searchParams.get('v');
        } else if (url.hostname.displayindexOf('youtu.be') >= 0) {
            v = url.pathname.replace('/', '');
        }

        if (!v) return;

        let video = document.createElement('div');
        video.style.width = '100%';
        video.style.maxWidth = '1000px';
        video.innerHTML = `<div style="display:inline-block;height:0px;width:100%;padding-top:56.5%;position:relative;"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%;" src="https://www.youtube.com/embed/${v}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
        link.after(video);
        link.remove();
    });
})();