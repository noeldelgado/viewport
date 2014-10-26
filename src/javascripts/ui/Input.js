Class(Dm.UI, 'Input').inherits(Widget)({
    HTML : '\
        <label>\
            <span></span>\
            <input class="dm-input"/>\
        </label>\
    ',
    prototype : {
        /*
         * The label text.
         * @property label <optional> [String]
         */
        label : null,
        /*
         * The input type.
         * @property type <optional> [String] ("text")
         */
        type : null,
        /**
         * The input value.
         * @property value <optional> [String] ("")
         */
        value : null,

        labelElement : null,
        inputElement : null,
        init : function(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.inputElement = this.element.find('input');
            this.labelElement = this.element.find('span');

            this.inputElement[0].setAttribute('type', this.type || 'text');
            this.setValue(this.value || "");
            this.labelElement.text(this.label);

            this._bindEvents();
        },

        /**
         * Events binding.
         * @method _bindEvents <private> [Function]
         * @return this [Dm.UI.Input]
         */
        _bindEvents : function _bindEvents() {
            this.inputElement.on('change', this._inputChangeHandler.bind(this));
            this.inputElement.on('focus', this._inputFocusHandler.bind(this));
            this.inputElement.on('blur', this._inputBlurHandler.bind(this));
            this.inputElement.on('click', this._inputClickHandler.bind(this));

            return this;
        },

        /**
         * The input change event handler.
         * @method _inputChangeHandler <private> [Function]
         * @dispatch "change" {value: inputElement.value}
         * @return undefined
         */
        _inputChangeHandler : function _inputChangeHandler(event) {
            this.dispatch('change', {
                value: event.target.value
            });
        },

        /**
         * Input focus event handler.
         * @method _inputChangeHandler <private> [Function]
         * @dispatch "focus"
         * @return undefined
         */
        _inputFocusHandler : function _inputFocusHandler(event) {
            this.dispatch('focus');
        },

        /**
         * Input blur event handler.
         * @method _inputBlurHandler <private> [Function]
         * @dispatch "blur"
         * @return undefined
         */
        _inputBlurHandler : function _inputBlurHandler(event) {
            this.dispatch('blur');
        },

        /**
         * Input click event handler.
         * @method _inputClickHandler <private> [Function]
         * @dispatch "click"
         * @return undefined
         */
        _inputClickHandler : function _inputClickHandler(event) {
            this.dispatch('click');
        },

        /**
         * Sets the value to the inputElement.
         * @method setValue <public> [Function]
         * @argument value <optional> [String]
         * @return undefined
         */
        setValue : function setValue(value) {
            this.inputElement[0].value = value;
            this.inputElement.change();
        },

        /**
         * Returns the value of the inputElement.
         * @method getValue <public> [Function]
         * @return this.inputElement.value [String]
         */
        getValue : function getValue() {
            return this.inputElement[0].value;
        }
    }
});
