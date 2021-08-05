import React, {Component} from 'react'
import AsHTMLElement from "../util/as-html-element";

class Comments extends Component {
  render () {
    return <p>
      Loading comments from post {this.props.post}...
      Load nested comments ? => {this.props.nested}
    </p>
  }
}

export default Comments
export { Comments }

AsHTMLElement(Comments, ['post'], 'post-comments')
