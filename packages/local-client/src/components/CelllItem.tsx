import {Cell} from "../state";
import CodeCell from "./CodeCell";
import TextEditor from "./TextEditor";
import ActionBar from "./ActionBar";
import './CellItem.css';

interface CelllItemProps {
    cell: Cell
}

const CellItem: React.FC<CelllItemProps> = ({cell}) => {
    let child: JSX.Element = cell.cellType === 'code' ?
        <>
            <div className="action-bar-wrapper">
                <ActionBar id={cell.id}/>
            </div>
            <CodeCell cell={cell}/>
        </>
        :
        <>
            <TextEditor cell={cell}/>
            <ActionBar id={cell.id}/>
        </>


    return (
        <div className="cell-item">
            {child}
        </div>
    )
}

export default CellItem;