/**
 *
 * Asynchronously loads the component for Lastfm
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
