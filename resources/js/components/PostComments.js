import {createElement} from 'react'
import {render} from 'react-dom'
import * as retargetEvents from 'react-shadow-dom-retarget-events';
import {Comments} from './Comments'

class PostComments extends HTMLElement {
    static get observedAttributes() {
        return ['post']
    }

    get props() {
        return Object.fromEntries(Object.values(this.attributes).map(attribute => [attribute.name, attribute.value]))
    }

    connectedCallback() {
        this.mountPoint = document.createElement('span');
        const shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(this.mountPoint);
        render(this.mRender(this.props), this.mountPoint)
        retargetEvents(shadowRoot);
    }

    mRender(props) {
        return createElement(Comments, props, createElement('slot'))
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (PostComments.observedAttributes.includes(name)) {
            render(this.mRender(this.props), this.mountPoint)
        }
    }
}

customElements.define('post-comments', PostComments)

export default PostComments
