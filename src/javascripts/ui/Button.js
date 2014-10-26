Class(Dm.UI, 'Button').inherits(Widget)({
    HTML : '<button></button>',
    ELEMENT_CLASS : 'dm-button',
    prototype : {
        /**
         * The button content.
         * @property text <optional> [String]
         */
        text : null,
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.setText(this.text);

            this._bindEvents();
        },

        /**
         * Events binding.
         * @method _bindEvents <private> [Function]
         * @return this [Dm.UI.Button]
         */
        _bindEvents : function _bindEvents() {
            this.element.on('click', this._clickHandler.bind(this));

            return this;
        },

        /**
         * Button click handler.
         * @method _clickHandler <private> [Function]
         * @dispatch 'click'
         * @return undefined
         */
        _clickHandler : function _clickHandler() {
            this.dispatch('click');
        },

        /**
         * Set the content of the button.
         * @method setText <public> [Function]
         * @argument value <optional> [String]
         * @return undefined
         */
        setText : function setText(value) {
            this.element[0].innerHTML = value;
        }
    }
});
