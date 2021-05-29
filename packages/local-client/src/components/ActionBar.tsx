import {useActions} from "../hooks/useActions";
import './ActionBar.css';

interface ActionBarProps {
    id: string
}

const ActionBar: React.FC<ActionBarProps> = ({id}) => {
    const {moveCell, deleteCell} = useActions();

    const upClickHandler = () => {
        moveCell(id, 'up')
    };
    const downClickHandler = () => {
        moveCell(id, 'down')
    };
    const deleteClickHandler = () => {
        deleteCell(id)
    };

    return (
        <div className="action-bar">
            <button className="button is-primary is-small action-btn" onClick={upClickHandler}>
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button className="button is-primary is-small action-btn" onClick={downClickHandler}>
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button className="button is-primary is-small action-btn" onClick={deleteClickHandler}>
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    )
}

export default ActionBar;