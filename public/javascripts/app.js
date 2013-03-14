var Viewport = (function(){

    var _target     = document.getElementById('target'),
        _iframe     = _target.querySelector('iframe'),
        _dropdown   = {},
        _url        = document.getElementById('add-url'),
        _reload     = document.getElementById('reload'),
        _notify     = document.getElementById('notify');

    var presets = {
        "small-phone"   : {w: 240, h: 320,  desc: 'Small Phone'},
        "iphone"        : {w: 320, h: 480,  desc: 'iPhone'},
        "small-tablet"  : {w: 480, h: 640,  desc: 'Small Tablet'},
        "ipad"          : {w: 768, h: 1024, desc: 'iPad'}
    };
    var defaultPreset = presets["iphone"];

    _dropdown.element   = document.getElementById('dropdead');
    _dropdown.current   = _dropdown.element.querySelector('button');
    _dropdown.list      = _dropdown.element.querySelector('ul');
    _dropdown.items;

    var init = function() {
        createDropdown();
        _dropdown.items = _dropdown.element.querySelectorAll('li');
        setCurrent(defaultPreset.w, defaultPreset.h, defaultPreset.desc);
        _dropdown.items[1].className = "active"; // :(
        setSize(defaultPreset.w, defaultPreset.h);
        setURL(this.url);
        bindEvents();
    };

    var bindEvents = function() {
        _url.addEventListener('click', getUrl, false);
        _reload.addEventListener('click', reload, false);

        // _iframe.addEventListener('load', function() {}, false);

        _dropdown.current.addEventListener('click', function(event) {
            if (_dropdown.list.style.display != 'none') {
                _dropdown.list.style.display = 'none';
                _dropdown.current.classList.remove("active");
            } else {
                _dropdown.list.style.display = '';
                _dropdown.current.className += " active";
            }
        }, false);

        _dropdown.list.addEventListener('click', function(event) {
            if (event.target && event.target.nodeName == "LI") {
                var w = event.target.dataset.width,
                    h = event.target.dataset.height,
                    d = event.target.dataset.desc;

                for (var i in _dropdown.items) {
                    _dropdown.items[i].className = "";
                }

                event.target.className = "active";
                setCurrent(w, h, d);
                setSize(w, h);
            }
        }, false);

        document.getElementsByTagName('body')[0].addEventListener('click', function(event) {
            if (event.target && event.target.nodeName === "BODY" || event.target.nodeName === "HEADER") {
                _dropdown.list.style.display = "none";
                _dropdown.current.classList.remove("active");
            }
        }, false);
    };

    var createDropdown = function() {
        var frag = document.createDocumentFragment();
        for (var i in presets) {
            var item    = document.createElement('li'),
                w       = presets[i].w,
                h       = presets[i].h,
                d       = presets[i].desc;

            item.innerHTML = w + " x " + h + " - " + d;
            item.setAttribute('data-width', w);
            item.setAttribute('data-height', h);
            item.setAttribute('data-desc', d);
            frag.appendChild(item);
        }
        _dropdown.list.style.display = "none";
        _dropdown.list.appendChild(frag);
    };

    var setCurrent = function(w, h, d) {
        _dropdown.current.classList.remove("active");
        _dropdown.list.style.display = "none";
        _dropdown.current.innerHTML = w + " x " + h + " - " + d;
    };

    var setSize = function(w, h) {
        _target.style.width     = w + 'px';
        _target.style.height    = h + 'px';
    };

    var setURL = function(url) {
        _iframe.src = url;
    };

    var getUrl = function() {
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            url = prompt("Enter URL:");
        pattern.test(url)
            ? setURL(url)
            : notify("Invalid URL");
    };

    var notify = function(message) {
        _notify.innerHTML = message;
        _notify.style.display = "block";
        setTimeout(function() {
            _notify.style.display = "none";
        }, 2000);
    };

    var reload = function() {
        _iframe.src = _iframe.src;
    };

    return  {
        url: "http://pixelia.me",
        init    : init,
        setSize : setSize,
        setURL  : setURL,
        reload  : reload
    }
})();
