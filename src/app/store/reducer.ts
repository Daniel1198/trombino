import { createReducer, on } from "@ngrx/store";
import { changeSearchValue, initAction } from "./action";

const initialState = {
    search: ''
};
export const rootReducer = createReducer(
    initialState,
    on(initAction, (state) => {
        return {...state}
    }),

    on(changeSearchValue, (state, props) => {
        return {
            ...state,
            search: props.search
        }
    })
);