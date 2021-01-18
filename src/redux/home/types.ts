import { IHomeItem } from "../../utils/models/other.model";

export const HOME_SUCCESS = 'HOME_SUCCESS';
export const HOME_FAILURE = 'HOME_FAILURE';
export const CONTACTDATA_SUCCESS = 'CONTACTDATA_SUCCESS';
export const CONTACTDATA_FAILURE = 'CONTACTDATA_FAILURE';
 
interface HomeSuccessAction {
  type: typeof HOME_SUCCESS,
  payload: IHomeItem
}

interface HomeFailureAction {
    type: typeof HOME_FAILURE
}

interface ContactDataSuccessAction {
  type: typeof CONTACTDATA_SUCCESS,
  payload: IHomeItem
}

interface ContactDataFailureAction {
    type: typeof CONTACTDATA_FAILURE
}

export type MasterDataActionType =  HomeSuccessAction | HomeFailureAction | ContactDataSuccessAction | ContactDataFailureAction;