import './AddCell.css';
import {useActions} from "../hooks/useActions";

interface AddCellProps {
    prevCellId: string | null;
    isVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({prevCellId, isVisible}) => {
    const {insertCellAfter} = useActions();

    const addCodeCellHandler = () => {
        insertCellAfter(prevCellId, 'code')
    }

    const addTextCellHandler = () => {
        insertCellAfter(prevCellId, 'text')
    }

    return (
        <div className={`add-cell ${isVisible && "add-cell--visible"}`}>
            <div className="add-cell__buttons">
                <button className="button is-rounded is-primary is-small" onClick={addCodeCellHandler}>
                    <span className="icon is-small"><i className="fas fa-plus"></i></span>
                    <span>Code</span>
                </button>
                <button className="button is-rounded is-primary is-small" onClick={addTextCellHandler}>
                    <span className="icon is-small"><i className="fas fa-plus"></i></span>
                    <span>Text</span>
                </button>
            </div>
            <div className="add-cell__divider"></div>
        </div>
    )
}

export default AddCell;