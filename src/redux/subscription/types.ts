import { SubscriptionItem } from "../../utils/models/other.model";

export const SUBSCRIPTION_SUCCESS = 'SUBSCRIPTION_SUCCESS';
export const SUBSCRIPTION_FAILURE = 'SUBSCRIPTION_FAILURE';
 
interface subscriptionSuccessAction {
  type: typeof SUBSCRIPTION_SUCCESS,
  payload: SubscriptionItem
}

interface subscriptionFailureAction {
    type: typeof SUBSCRIPTION_FAILURE
}

export type MasterDataActionType =     subscriptionSuccessAction | subscriptionFailureAction;