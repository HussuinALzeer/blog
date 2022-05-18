import { Slider } from "../model/slider.model";
import * as fromSliderAction from '../action/slider.actions';


export interface State{
   slider: boolean;
}

export const initialState: State = {
   slider:false
}

export function SliderReducer(state=initialState,action:fromSliderAction.SliderActions) {
   switch (action.type) {
      case fromSliderAction.SLIDER:
         return {
            slider:true
         }
      
      case fromSliderAction.SLIDER_SUCCESS:
         return  {
            slider:true
         }

      case fromSliderAction.SLIDER_FAIL:
         return {
            slider: false
         }
      
   }
}

export const getSlider = (state: Slider) => state.slider;