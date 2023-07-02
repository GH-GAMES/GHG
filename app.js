let header = document.querySelector(selectors:'.js-header'),
    headerH = document.querySelector(selectors:'.js-header').clientHeight;

    document.onscroll = function()
    {
        let scroll = window.scrollY;

        if(scroll>headerH)
        {
            header.classList.add('fixed');
            document.body.style.paddingTop = headerH + 'px';
        }
    }