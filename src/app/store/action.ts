import { createAction, props } from "@ngrx/store";

export const initAction = createAction('Init App');

export const changeSearchValue = createAction('Change searchValue', props<{ search: string }>());