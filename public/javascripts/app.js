var Viewport = (function(){

    var _target     = document.getElementById('target'),
        _iframe     = _target.querySelector('iframe'),
        _dropdown   = {},
        _url        = document.getElementById('add-url'),
        _reload     = document.getElementById('reload'),
        _notify     = document.getElementById('notify');

    _dropdown.element   = document.getElementById('dropdead');
    _dropdown.current   = _dropdown.element.querySelector('button');
    _dropdown.list      = _dropdown.element.querySelector('select');
    _dropdown.items;

    var presets = {
        "small-phone"   : {w: 240, h: 320,  desc: 'Small Phone'},
        "iphone"        : {w: 320, h: 480,  desc: 'iPhone'},
        "small-tablet"  : {w: 480, h: 640,  desc: 'Small Tablet'},
        "ipad"          : {w: 768, h: 1024, desc: 'iPad'}
    };
    var defaultPreset = presets["iphone"];

    var init = function() {
        createDropdown();
        updateDropdown(defaultPreset.w, defaultPreset.h, defaultPreset.desc);
        _dropdown.list[1].selected = true; // :(
        setSize(defaultPreset.w, defaultPreset.h);
        setURL(this.url);
        bindEvents();
    };

    var bindEvents = function() {
        _url.addEventListener('click', getUrl, false);
        _reload.addEventListener('click', reload, false);

        _dropdown.list.addEventListener('mousedown', function(event) {
            _dropdown.current.classList.add("active");
        }, false);

        _dropdown.list.addEventListener('blur', function(event) {
            _dropdown.current.classList.remove("active");
        }, false);

        _dropdown.list.addEventListener('change', function(event) {
            var w = this.selectedOptions[0].dataset.width,
                h = this.selectedOptions[0].dataset.height,
                d = this.selectedOptions[0].dataset.desc;
            setSize(w, h);
            updateDropdown(w, h, d);
        });
    };

    var createDropdown = function() {
        var frag = document.createDocumentFragment();
        for (var i in presets) {
            var item    = document.createElement('option'),
                w       = presets[i].w,
                h       = presets[i].h,
                d       = presets[i].desc;

            item.innerHTML = w + " x " + h + " - " + d;
            item.setAttribute('data-width', w);
            item.setAttribute('data-height', h);
            item.setAttribute('data-desc', d);
            frag.appendChild(item);
        }
        _dropdown.list.appendChild(frag);
    };

    var updateDropdown = function(w, h, d) {
        _dropdown.current.classList.remove("active");
        _dropdown.current.innerHTML = w + " x " + h + " - " + d;
    };

    var setSize = function(w, h) {
        _target.style.width     = w + 'px';
        _target.style.height    = h + 'px';
        return this;
    };

    var setURL = function(url) {
        _iframe.src = url;
        return this;
    };

    var reload = function() {
        _iframe.src = _iframe.src;
        return this;
    };

    var getUrl = function() {
        var pattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            url     = prompt("Enter URL:");
        if (url !== null) {
            pattern.test(url)
                ? setURL(url)
                : notify("Invalid URL");
        }
    };

    var notify = function(message) {
        _notify.innerHTML = message;
        _notify.style.display = "block";
        setTimeout(function() {
            _notify.style.display = "none";
        }, 2000);
    };

    return  {
        url: "http://git.local/js/01-public/text-to-binary/",
        init    : init,
        setSize : setSize,
        setURL  : setURL,
        reload  : reload
    }
})();
