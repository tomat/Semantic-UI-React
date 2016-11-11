'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _debug = void 0;
var noop = function noop() {
  return undefined;
};

_debug = function _debug() {
  return noop;
};

/**
 * Create a namespaced debug function.
 * @param {String} namespace Usually a component name.
 * @example
 * import { makeDebugger } from 'src/lib'
 * const debug = makeDebugger('namespace')
 *
 * debug('Some message')
 * @returns {Function}
 */
var makeDebugger = exports.makeDebugger = function makeDebugger(namespace) {
  return _debug('semanticUIReact:' + namespace);
};

/**
 * Default debugger, simple log.
 * @example
 * import { debug } from 'src/lib'
 * debug('Some message')
 */
var debug = exports.debug = makeDebugger('log');