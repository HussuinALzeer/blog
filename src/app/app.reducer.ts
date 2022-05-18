import { Action, ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromNav from './store/reducers/nav.reduer';
import * as fromSlider from '../app/store/reducers/slider.reducer';

export interface State{
   auth: fromNav.State
   slider:fromSlider.State
}

// solved the error 
//https://lifesaver.codes/answer/actionreducermap-compilation-error-when-strictfunctiontypes-is-enabled-in-tsconfig-951
export const reducers: ActionReducerMap<any, Action> = {
   auth: fromNav.AuthReducer,
   slider:fromSlider.SliderReducer
};


export const getAuthState = createFeatureSelector<fromNav.State>('auth');
export const getAuth = createSelector(getAuthState, fromNav.getAuth);


export const getSliderState = createFeatureSelector<fromSlider.State>('slider');
export const getSlider = createSelector(getSliderState, fromSlider.getSlider);