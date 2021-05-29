import MonacoEditor, {OnChange, OnMount} from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import {useRef} from "react";
import './CodeEditor.css';
import './CodeSyntax.css';
import codeShift from 'jscodeshift';
import MonacoJSXHighlighter from 'monaco-jsx-highlighter';


interface CodeEditorProps {
    initialValue: string;
    onChange(value: string | undefined): void;
}

const CodeEditor: React.FC<CodeEditorProps> = props => {
    const handleEditorChange: OnChange = (value) => {
        props.onChange(value);
    }

    const editorRef = useRef<any>();
    const handleEditorDidMount: OnMount = (editor) => {
        editorRef.current = editor;

        const monacoJSXHighlighter  = new MonacoJSXHighlighter(
            // @ts-ignore
            window.monaco,
            codeShift,
            editor
        );
        monacoJSXHighlighter.highLightOnDidChangeModelContent(
            () => {},
            () => {},
            undefined,
            () => {},
        );
    }

    const FormatHandler = () => {
        const unformattedCode = editorRef.current.getValue();
        const formattedCode = prettier.format(unformattedCode, {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuote: true
        }).replace(/\n$/, '');
        editorRef.current.setValue(formattedCode);
    }

    return (
        <div className="editor-wrapper">
            <button
                onClick={FormatHandler}
                className="button button-format is-primary is-small"
                >Format</button>
            <MonacoEditor
                value={props.initialValue}
                onMount={handleEditorDidMount}
                onChange={handleEditorChange}
                language="javascript"
                height="100%"
                theme="vs-dark"
                options={{
                    wordWrap: 'on',
                    minimap: {enabled: false},
                    showUnused: false,
                    folding: false,
                    lineNumbersMinChars: 3,
                    fontSize: 16,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 2
                }
                }/>
        </div>
        )
}

export default CodeEditor;