import { Nav } from "../model/nav.model";
import * as fromNavActions from '../action/nav.actions';
import { AUTH, AUTH_FAIL, AUTH_SUCCESS } from '../action/nav.actions';

export interface State{
   auth: boolean;
}

export const initailState: State = {
   auth:false
} 

export function AuthReducer(state=initailState ,action:fromNavActions.NavActions) {
   switch (action.type) {
      case AUTH: {
         return {
            auth: true
         }
      }
      
      case AUTH_SUCCESS: {
         return {
            auth: true
         }
      }   
         
      case AUTH_FAIL: {
         return {
            auth: false
         }
      }   
         
      default:
         return state
   }
}

export const getAuth = (state: Nav) => state.auth;
