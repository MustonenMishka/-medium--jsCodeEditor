import MDEditor from '@uiw/react-md-editor';
import {useEffect, useRef, useState} from "react";
import './TextEditor.css';
import {Cell} from "../state";
import {useActions} from "../hooks/useActions";

interface TextEditorProps {
    cell: Cell
}

const TextEditor: React.FC<TextEditorProps> = ({cell}) => {
    const [editMode, setEditMode] = useState(false);
    const {updateCell} = useActions();
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => { // listening outer mouse clicks to trigger editor's change to view mode
        const listener = (e: MouseEvent) => {
            if (editorRef.current && e.target && editorRef.current.contains(e.target as Node)) {
                return
            }
            setEditMode(false)
        };
        document.addEventListener('click', listener, {capture: true});
        return () => {
            document.removeEventListener('click', listener, {capture: true});
        }
    }, [])

    const toggleMode = () => {
        setEditMode(true)
    }

    const editorChangeHandler = (val: string | undefined) => {
        updateCell(cell.id, val || '')
    }

    if (editMode) {
        return (
            <div className="text-editor" ref={editorRef}>
                <MDEditor value={cell.content} onChange={editorChangeHandler}/>
            </div>
        )
    }

    return (
        <div className="text-editor card" onClick={toggleMode}>
            <div className="card-content">
                <MDEditor.Markdown source={cell.content || 'Click to edit'}/>
            </div>
        </div>
    )
}

export default TextEditor