import {Cell} from "../cell";
import {Action} from "../actions";
import {ActionType} from "../action-types";
import produce from "immer";

interface CellState {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: CellState = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

const randomId = () => {
    return Math.random().toString(36).substr(2, 5)
}

const reducer = produce((state: CellState = initialState, action: Action): CellState => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const {id, content} = action.payload;
            state.data[id].content = content;
            return state;

        case ActionType.DELETE_CELL:
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
            return state;

        case ActionType.MOVE_CELL:
            const index = state.order.findIndex(id => id === action.payload.id);
            const targetIndex = action.payload.direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex > state.order.length - 1) {
                return state;
            }

            state.order[index] = state.order[targetIndex];
            state.order[targetIndex] = action.payload.id

            return state;

        case ActionType.INSERT_CELL_AFTER:
            const newCell: Cell = {
                content: '',
                cellType: action.payload.cellType,
                id: randomId()
            };
            state.data[newCell.id] = newCell;

            const foundIdx = state.order.findIndex(id => id === action.payload.id);
            if (foundIdx < 0) {
                state.order.unshift(newCell.id)
            } else {
                state.order.splice(foundIdx + 1, 0, newCell.id)
            }

            return state;

        case ActionType.FETCH_CELLS:
            state.loading = true;
            state.error = null;

            return state;

        case ActionType.FETCH_CELLS_COMPLETE:
            state.order = action.payload.map(cell => cell.id);
            state.data = action.payload.reduce((acc, cell) => {
                acc[cell.id] = cell;
                return acc
            }, {} as CellState['data']);

            state.loading = false

            return state;

        case ActionType.FETCH_CELLS_ERROR:
            state.loading = false;
            state.error = action.payload;

            return state;

        case ActionType.SAVE_CELLS_ERROR:
            state.error = action.payload;

            return state;

        default:
            return state
    }
}, initialState)

export default reducer;