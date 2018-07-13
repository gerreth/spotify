/**
 *
 * Asynchronously loads the component for Songkick
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
