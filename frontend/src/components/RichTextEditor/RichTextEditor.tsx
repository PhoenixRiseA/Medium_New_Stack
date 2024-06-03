import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


interface MyEditorProps {
    editorState: EditorState;
    onEditorChange: (editorState: EditorState) => void;
}
export const RichTextEditor: React.FC<MyEditorProps> = ({ editorState, onEditorChange }) => {

    return <Editor
        editorState={editorState}
        onEditorStateChange={onEditorChange}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
    />
}