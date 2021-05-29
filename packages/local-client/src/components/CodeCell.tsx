import './ProgressBar.css';
import './CodeCell.css';
import {useEffect} from "react";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";
import ResizableCustom from "./ResizableCustom";
import {Cell} from "../state";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useCumulativeCode} from "../hooks/useCumulativeCode";

interface CodeCellProps {
    cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
    const {updateCell, createBundle} = useActions();
    const bundle = useTypedSelector(state => state.bundles.cellsData[cell.id]);
    const cumulativeCode = useCumulativeCode(cell.id);
    useEffect(() => {
            if (!bundle) {
                createBundle(cell.id, cumulativeCode);
                return
            }

            const timer = setTimeout(async () => {
                createBundle(cell.id, cumulativeCode)
            }, 1000);
            return () => {
                clearTimeout(timer)
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [cumulativeCode, cell.id, createBundle]
    )
    ;

    const changeCodeEditorHandler = (value: string) => {
        updateCell(cell.id, value)
    };

    return (
        <ResizableCustom direction="vertical">
            <div style={{height: 'calc(100% - 10px)', display: 'flex', flexDirection: 'row'}}>
                <ResizableCustom direction='horizontal'>
                    <CodeEditor
                        initialValue={cell.content}
                        onChange={changeCodeEditorHandler}
                    />
                </ResizableCustom>
                <div className="preview-wrapper">
                    {
                        !bundle || bundle.loading ?
                            <div className="progress-wrapper">
                                <div className="progress-cover">
                                    <progress className="progress is-small is-primary" max="100">
                                        Loading...
                                    </progress>
                                </div>
                            </div>
                            : <Preview code={bundle.code} bundleError={bundle.err}/>
                    }
                </div>
            </div>
        </ResizableCustom>
    )
}

export default CodeCell;