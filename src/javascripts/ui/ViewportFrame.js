Class(Dm.UI, 'ViewportFrame').inherits(Widget)({
    HTML : '\
        <div>\
            <iframe></iframe>\
        </div>\
    ',
    ELEMENT_CLASS : 'dm-frame',
    prototype : {
        iframeElement : null,
        init : function(config) {
            Widget.prototype.init.call(this, config);

            this.iframeElement = this.element.find('iframe');
        },

        /**
         * Returns the reference to the main element of the widget.
         * @method getElement <public> [Function]
         * @return this.element [jQueryObject]
         */
        getElement : function getElement() {
            return this.element;
        },

        /**
         * Sets the source of the iframe.
         * @method setSource <public> [Function]
         * @argument source <optional> [String]
         * @return undefined
         */
        setSource : function setSource(source) {
            this.iframeElement[0].src = source;
        },

        /**
         * Sets the width of the iframe.
         * @method setWidth <public> [Function]
         * @argument value <required> [Number]
         * @return undefined
         */
        setWidth : function setWidth(value) {
            this.iframeElement[0].style.width = value + 'px';
        },

        /**
        * Sets the height of the iframe.
        * @method setHeight <public> [Function]
        * @argument value <required> [Number]
        * @return undefined
        */
        setHeight : function setHeight(value) {
            this.iframeElement[0].style.height = value + 'px';
        }
    }
});
