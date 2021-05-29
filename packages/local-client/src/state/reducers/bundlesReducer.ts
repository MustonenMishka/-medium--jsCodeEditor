import produce from "immer";
import {Action} from "../actions";
import {ActionType} from "../action-types";

interface BundlesState {
    isInitialized: boolean;
    cellsData: {
        [key: string]: {
            code: string;
            loading: boolean;
            err: string
        } | undefined
    }
}

const initialState: BundlesState = {isInitialized: false, cellsData: {}};

const reducer = produce((state: BundlesState = initialState, action: Action): BundlesState => {
switch (action.type) {
    case ActionType.INIT_BUNDLER_COMPLETE:
        state.isInitialized = true;
        return state
    case ActionType.BUNDLE_START:
        state.cellsData[action.payload.cellId] = {
            loading: true,
            code: '',
            err: ''
        };
        return state
    case ActionType.BUNDLE_COMPLETE:
        state.cellsData[action.payload.cellId] = {
            loading: false,
            code: action.payload.bundle.code,
            err: action.payload.bundle.err
        };
        return state
    default:
        return state
}
}, initialState);

export default reducer