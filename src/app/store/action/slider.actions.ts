import { Action } from "@ngrx/store";

export const SLIDER = '[slider] ';
export const SLIDER_SUCCESS = '[slider] Success ';
export const SLIDER_FAIL = '[slider] Fail ';

export class Slider implements Action {
   readonly type = SLIDER;
}

export class Slider_success implements Action {
   readonly type = SLIDER_SUCCESS;
}

export class Slider_fail implements Action {
   readonly type = SLIDER_FAIL;
}

export type SliderActions = Slider | Slider_fail | Slider_success;