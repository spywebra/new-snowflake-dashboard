/**
 * This file contains a few "workaround" functions
 * These functions must only be used during the migration, from the "legacy" phase to the new one
 */

import resolvers from '../legacy/resolvers.json';

function getResolverName(resolverId) {
  if (resolvers[resolverId].title && resolverId !== '0xb4a0208e0B6d367608E70175B710fE6E604838E4') {
    return resolvers[resolverId].title;
  }

  return 'Default';
}

export {
  getResolverName,
};
