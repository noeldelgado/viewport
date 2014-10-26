Class(Dm, 'App').includes(NodeSupport)({
    prototype : {
        DEFAULT_SOURCE : 'http://pixelia.me',
        headerElement : null,
        navElement : null,
        drawerElement : null,
        init : function init() {
            this.headerElement = $('header');
            this.navElement = $('nav');
            this.drawerElement = $('.drawer');

            this.appendChild(new Dm.UI.URLInput({
                name : 'URLInput',
                inputValue : this.DEFAULT_SOURCE
            })).render(this.headerElement);

            this.appendChild(new Dm.UI.Dropdown({
               name : 'dropdown'
            })).render(this.headerElement);

            this.appendChild(new Dm.UI.Input({
                name : 'inputWidth',
                label : 'W:',
                type : 'number',
                className : 'input-dimension'
            })).render(this.headerElement);

            this.appendChild(new Dm.UI.Input({
                name : 'inputHeight',
                label : 'H:',
                type : 'number',
                className : 'input-dimension'
            })).render(this.headerElement);

            this.appendChild(new Dm.UI.Button({
                name : 'rotateWidget',
                text : 'Rotate <span class="entypo">&#10227;</span>',
                className : 'rotate-button'
            })).render(this.headerElement);

            this.appendChild(new Dm.UI.ViewportFrame({
                name : 'frame'
            })).render(this.drawerElement);

            this._bindEvents();
        },

        run : function run() {
            Utils.getJSON("devices.json", function(data) {
                this.dropdown.addOptions(JSON.parse(data)).select(2);
            }.bind(this));

            this.frame.setSource(this.DEFAULT_SOURCE);

            return this;
        },

        _bindEvents : function _bindEvents() {
            this.URLInput.bind('submit', function(data) {
                this.frame.setSource(data.inputValue);
            }.bind(this));

            this.dropdown.bind('change', function(data) {
                var width, height, description;

                width = data.element.dataset.width;
                height = data.element.dataset.height;
                description = data.element.dataset.desc;

                this.inputWidth.setValue(width);
                this.inputHeight.setValue(height);
                this.dropdown.setText(description);

                this.rotateWidget.deactivate();
            }.bind(this));

            this.inputWidth.bind('change', function(data) {
                this.frame.setWidth(data.value);
            }.bind(this));

            this.inputWidth.bind('focus', function() {
                this.frame.getElement()[0].classList.add('no-animate');
            }.bind(this));

            this.inputWidth.bind('blur', function() {
                this.frame.getElement()[0].classList.remove('no-animate');
            }.bind(this));

            this.inputHeight.bind('change', function(data) {
                this.frame.setHeight(data.value);
            }.bind(this));

            this.inputHeight.bind('focus', function() {
                this.frame.getElement()[0].classList.add('no-animate');
            }.bind(this));

            this.inputHeight.bind('blur', function() {
                this.frame.getElement()[0].classList.remove('no-animate');
            }.bind(this));

            this.rotateWidget.bind('click', function() {
                var width = this.inputWidth.getValue(),
                    height = this.inputHeight.getValue();

                this.inputWidth.setValue(height);
                this.inputHeight.setValue(width);

                if (this.rotateWidget.active) {
                    return this.rotateWidget.deactivate();
                }

                return this.rotateWidget.activate();
            }.bind(this));

            return this;
        }
    }
});
