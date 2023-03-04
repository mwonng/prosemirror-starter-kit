import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state' // eslint-disable-line

const myPluginKey = new PluginKey('my-plugin')

export const myPlugin = () => new Plugin( {
    key: myPluginKey,
    props: {
        handleClick: (view, pos, event) => {
            console.log("handle click",pos, view.domAtPos(pos))
            console.log("pos",pos)
            console.log("myplugin, markViews", view.state.selection.$anchor.marks())
            const marks = view.state.selection.$anchor.marks();
            if (marks.some(el => el.type.name === 's')) {
                console.log("found marks s")
            } else {
                console.log("not found")
            }
        }
    },
    view: (editorView) =>  {
        console.log("myplugin, editorview", editorView)
        return {update: (editorView) => editorView};
    }
})