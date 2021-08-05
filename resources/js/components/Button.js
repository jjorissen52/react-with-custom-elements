import * as React from 'react'
import AsHTMLElement from "../util/as-html-element";

const MyButton = ({ id, posts, fromstore, storage: { store, path, handle } }) => {
    const [timesClicked, setTimesClicked] = React.useState(0)
    handle.timesClicked = timesClicked
    return <button
        value={timesClicked}
        onClick={() => setTimesClicked(timesClicked + 1)}>
        Click Me (timesClicked: {timesClicked}, posts: {posts}, fromstore: {fromstore})
    </button>
}

export default MyButton
AsHTMLElement(MyButton, ['posts', 'fromstore'])
