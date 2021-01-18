import { AuthReducer}   from './auth/reducer'
import { UserReducer}   from './user/reducer'
import { DiscoveryReducer}   from './discovery/reducer'
import { MasterDataReducer } from './master-data/reducer';
import { NetworkReducer } from './network/reducer';
import { ProjectReducer } from './project/reducer';
import { HomeReducer } from './home/reducer';
import { HowItWorkReducer } from './how-it-work/reducer';
import Subscription from '../routes/home/Subscription';
import { SubscriptionReducer } from './subscription/reducer';

 export const reducers = {
  auth : AuthReducer,
  masterData: MasterDataReducer,
  user: UserReducer,
  discovery: DiscoveryReducer,
  network: NetworkReducer,
  project: ProjectReducer,
  home:HomeReducer,
  howitwork:HowItWorkReducer,
  subscription: SubscriptionReducer
};
