import { compose } from 'redux';
interface Window {
  [key:string]: any; // Add index signature
}
let windowObj : Window = window;
export const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window && windowObj['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
  compose;
