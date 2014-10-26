Class(Dm.UI, 'Dropdown').inherits(Widget)({
    HTML : '\
        <div>\
            <select></select>\
        </div>\
    ',
    ELEMENT_CLASS : 'dm-dropdown',
    prototype : {
        selectElement : null,
        buttonElement : null,
        init : function(config) {
            Widget.prototype.init.call(this, config);

            this.selectElement = this.element.find('select');
            this.buttonElement = this.element.find('button');

            this.appendChild(new Dm.UI.Button({
                name : 'buttonWidget'
            })).render(this.element);

            this._bindEvents();
        },

        /**
         * Event bindings.
         * @method _bindEvents <private> [Function]
         * @return this [Dm.UI.Dropdown]
         */
        _bindEvents : function _bindEvents() {
            this.selectElement.on('change', this._selectChangeHandler.bind(this));

            return this;
        },

        /**
         * Select's change event handler.
         * @method _selectChangeHandler <private> [Function]
         * @dispatch 'change' {element: selectedOption}
         * @return undefined
         */
        _selectChangeHandler : function _selectChangeHandler(event) {
           this.dispatch('change', {
               element: event.target.selectedOptions[0]
           });
        },

        /**
         * Update the visible text of ui's dropdown.
         * @method setText <public> [Function]
         * @argument value <optional> [String]
         * @return undefined
         */
        setText : function setText(value) {
            this.buttonWidget.setText(value);
        },

        /**
         * Create and append the optionElements to the selectElement.
         * @method addOptions <public> [Function]
         * @argument options <required> [Array]
         * @return this [Dm.UI.Dropdown]
         */
        addOptions : function addOptions(options) {
            var _frag = document.createDocumentFragment();

            options.forEach(function(option) {
                var element, width, height, name;

                element = document.createElement('option');
                width = option.width;
                height = option.height;
                name = option.name;

                element.innerHTML = width + " x " + height + " - " + name;
                element.setAttribute('data-width', width);
                element.setAttribute('data-height', height);
                element.setAttribute('data-desc', name);

                _frag.appendChild(element);
            });

            this.selectElement.append(_frag);

            return this;
        },

        /**
         * Select a specific optionElement of the dropdown by index.
         * @method select <public> [Function]
         * @argument index <required> [Number]
         * @return this [Dm.UI.Dropdown]
         */
        select : function select(index) {
            this.selectElement[0][index].setAttribute('selected', true);
            this.selectElement.change();

            return this;
        }
    }
});
