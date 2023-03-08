import { Plugin } from 'prosemirror-state';
import { PluginKey } from 'prosemirror-state' // eslint-disable-line
import { Fragment, NodeRange } from 'prosemirror-model';
import { Transform } from 'prosemirror-transform';
import { schema } from '../schema'

const myPluginKey = new PluginKey('my-plugin')

const handleChangeEvent = (view, pos, event) => {
    // console.log("handle click",pos, view.domAtPos(pos))
    // console.log("pos",pos)
    // console.log("myplugin, markViews", view.state.selection.$cursor.marks())
    const marks = view.state.selection.$anchor.marks();
    console.log("depth", view.state.selection.$cursor.depth)
    if (marks.some(el => el.type.name === 'strong')) {
        // console.log("found marks strong")
        var state = view.state;
        const { $cursor } = state.selection;
        const $pos = state.doc.resolve($cursor.pos)
        const linkStart = $cursor.pos - $pos.textOffset
        const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize

        console.log("start", linkStart, "end", linkEnd)
        console.log($cursor.pos)

        const strong = schema.marks.strong; // get the strong mark type from the schema

        
        const strongNode = schema.text("**",[strong.create()]); // create a new strong node
        
        const currentNode = state.doc.nodeAt($cursor.pos);
        const newText = "**"
        const newTextNode = schema.text(newText);
        const newCurrentNode = currentNode.copy(newText? [newTextNode]: null)


        console.log("strongNode",strongNode)
        console.log("currentNode",currentNode)

        console.log("depth", state.selection.$from.depth)
        // console.log("resolve",state.selection.$head.marks(),state.selection.$to.marks())
        // const nodeRange = new NodeRange($cursor, $cursor, 0);

        const tr = state.tr.insert(linkStart, [strongNode]);
        view.dispatch(tr);
        console.log("call dispatch")
    } else {
        console.log("not found",view.state.selection.$cursor)
    }
}

export const myPlugin = () => new Plugin( {
    key: myPluginKey,
    props: {
        handleClick: handleChangeEvent,
        handleDOMEvents: {
            selectionchange: (view, event) => {
                // const marks = view.state.selection.$anchor.marks();
                // if (marks.some(el => el.type.name === 'strong')) {
                //     console.log("found marks strong")
                // } else {
                //     console.log("not found")
                // }
                const newEditorState = view.state;
                console.log("selectionchange", view.state.selection.$anchor)
                console.log("myplugin, markViews",view.state)
                return true
            },
        },
        
    },
    view: (editorView) =>  {
        return {update: (editorView, prevState) => {
            var state = editorView.state;
            const marks = state.selection.$cursor.marks();

            const { $cursor } = state.selection;


            const markType = schema.marks.strong; // replace with your mark type
            // const marks = state.doc.resolve($cursor.pos).marks();
            // console.log("marks", marks)
            // const markRange = marks && marks.find(mark => mark.type === markType);
            // console.log("markRange", markRange)

            // if (markRange) {
            //     const start = markRange.start;
            //     const end = markRange.end;
            //     console.log("mark range",start, end);
            // }
            

            // if (marks.some(el => el.type.name === "strong")) {

            //     // const { $cursor } = state.selection;
            //     // const markType = schema.marks.strong; // replace with your mark type
            //     // const marks = state.doc.resolve($cursor.pos).marks();
            //     // const markRange = marks && marks.find(mark => mark.type === markType);
            //     // if (markRange) {
            //     //     const start = markRange.start;
            //     //     const end = markRange.end;
            //     //     console.log("mark range",start, end);
            //     // }

            //     const $pos = state.doc.resolve($cursor.pos)
            //     const linkStart = $cursor.pos - $pos.textOffset
            //     const linkEnd = linkStart + $pos.parent.child($pos.index()).nodeSize

            //     console.log("start", linkStart, "end", linkEnd)
            //     console.log($cursor.pos)


            //     // const currentNode = state.doc.nodeAt($cursor.pos);
            //     // console.log("resolve",state.selection.$head.marks(),state.selection.$to.marks())
            //     // const nodeRange = new NodeRange($cursor, $cursor, 0);

            //     const newNode = schema.nodes.paragraph.create();

            //     // console.log("found marks strong",currentNode)
            //     // const span = document.createElement("span")
            //     // span.innerText = "**"

            //     const tr = state.tr.insert(linkStart,newNode);
            //     view.dispatch(tr);
            // } else {
            //     console.log("not found")
            // }
            return
        }};
    }
})