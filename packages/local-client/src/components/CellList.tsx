import {useTypedSelector} from "../hooks/useTypedSelector";
import CellItem from "./CelllItem";
import AddCell from "./AddCell";
import {Fragment, useEffect} from 'react';
import {useActions} from "../hooks/useActions";
import './ProgressBar.css';
import './CellList.css';

const CellList: React.FC = () => {
    const {initBundler, fetchCells} = useActions();

    const isInitialized = useTypedSelector(state => state.bundles.isInitialized);
    const cells = useTypedSelector(({cells: {order, data}}) => {
        return order.map(id => data[id]);
    });

    useEffect(() => {
        initBundler();
        fetchCells();
    }, [initBundler, fetchCells]);

    if (!isInitialized) {
        return (
            <progress className="progress progress-centered is-small is-primary center" max="100">
                Loading...
            </progress>
        )
    }

    const cellItems = cells.map(cell => (
        <Fragment key={cell.id}>
            <CellItem cell={cell}/>
            <AddCell prevCellId={cell.id}/>
        </Fragment>
    ))

    return (
        <div className="cell-list">
            <AddCell isVisible={!cells.length} prevCellId={null}/>
            {cellItems}
        </div>
    )
}

export default CellList;