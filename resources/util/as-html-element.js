import {createElement} from "react";
import {render} from "react-dom";
import * as retargetEvents from "react-shadow-dom-retarget-events";

const AsHTMLElement = (ReactComponent, props, elementName) => {
    class CustomComponent extends HTMLElement {
        static get observedAttributes() {
            return props
        }

        get props() {
            return Object.fromEntries(Object.values(this.attributes).map(attr => [attr.name, attr.value]))
        }

        mRender() {
            return createElement(ReactComponent, this.props, createElement('slot'))
        }

        connectedCallback() {
            this.mountPoint = document.createElement('span');
            const shadowRoot = this.attachShadow({mode: 'open'});
            shadowRoot.appendChild(this.mountPoint);
            render(this.mRender(this.props), this.mountPoint)
            retargetEvents(shadowRoot);
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (CustomComponent.observedAttributes.includes(name)) {
                render(this.mRender(this.props), this.mountPoint)
            }
        }
    }

    customElements.define(elementName, CustomComponent)
    return CustomComponent
}

export default AsHTMLElement
