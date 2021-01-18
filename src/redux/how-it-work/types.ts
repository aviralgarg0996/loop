import { IHomeItem, IHowItWorkItem } from "../../utils/models/other.model";

export const HOWITWORK_SUCCESS = 'HOWITWORK_SUCCESS';
export const HOWITWORK_FAILURE = 'HOWITWORK_FAILURE';
 
interface HowItWorkSuccessAction {
  type: typeof HOWITWORK_SUCCESS,
  payload: IHowItWorkItem
}

interface HowItWorkFailureAction {
    type: typeof HOWITWORK_FAILURE
}

export type MasterDataActionType =     HowItWorkSuccessAction | HowItWorkFailureAction;