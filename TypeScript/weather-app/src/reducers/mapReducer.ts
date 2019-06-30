import { ActionTypes } from "../constants";
import { mapReadyAction } from "../actions";

export type MapState = {
    ready: boolean;
}

const initialState = {
    ready: false
};

type Action = ReturnType<typeof mapReadyAction>

export const mapReducer = (state: MapState = initialState, action: Action): MapState => {
    switch (action.type) {
        case ActionTypes.MAP_READY:
            return {
                ...state,
                ready: true
            }

        default:
            return state;
    }
}
