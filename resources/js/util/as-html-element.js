import {createElement} from "react";
import {render} from "react-dom";
import {kebabCase} from "./misc";
import store from '../store'

const AsHTMLElement = (ReactComponent, props, elementName = null) => {
    const ignore = new Set(['Error: Target container is not a DOM element.'])
    const name = elementName ?? kebabCase(ReactComponent.displayName ?? ReactComponent.name)
    store[name] = {
        ...store[name]
    }
    const defaultId = Object.keys(store[name]).length ? `${name}-${Object.keys(store[name]).length}` : name
    class CustomComponent extends HTMLElement {
        static get observedAttributes() {
            return props
        }

        get props() {
            const pProps = Object.values(this.attributes).reduce((accum, attr) => {
                accum[attr.name] = attr.value
                return accum
            }, {id: defaultId})
            if (!this.firstRender) {
                store[name][pProps.id] = {}
                this.firstRender = true
            }
            pProps.storage = { store, handle: store[name][pProps.id], path: [name, pProps.id] }
            return pProps
        }

        mRender() {
            return createElement(ReactComponent, this.props, createElement('slot'))
        }

        connectedCallback() {
            this.mountPoint = document.createElement('span');
            render(this.mRender(this.props), this)
        }

        attributeChangedCallback(name, oldValue, newValue) {
            if (CustomComponent.observedAttributes.includes(name)) {
                try {
                    render(this.mRender(this.props), this)
                } catch (e) {
                    if (!ignore.has(String(e))) console.error(e)
                }
            }
        }
    }

    customElements.define(name, CustomComponent)
    return CustomComponent
}

export default AsHTMLElement
