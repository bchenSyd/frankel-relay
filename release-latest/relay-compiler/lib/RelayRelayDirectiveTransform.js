/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayRelayDirectiveTransform
 * 
 */

'use strict';

var _extends3 = _interopRequireDefault(require('babel-runtime/helpers/extends'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RELAY = 'relay';
var PLURAL = 'plural';

function transformSchema(schema) {
  if (schema.getDirectives().find(function (directive) {
    return directive.name === RELAY;
  })) {
    return schema;
  }
  return require('graphql').extendSchema(schema, require('graphql').parse('directive @relay(plural: Boolean) on FRAGMENT'));
}

/**
 * A transform that extracts `@relay(plural: Boolean)` directives and converts
 * them to metadata that can be accessed at runtime.
 */
function transform(context) {
  return require('./RelayIRTransformer').transform(context, {
    Fragment: visitFragment
  }, function () {
    return {};
  });
}

function visitFragment(fragment) {
  var relayDirective = fragment.directives.find(function (_ref) {
    var name = _ref.name;
    return name === RELAY;
  });
  if (!relayDirective) {
    return fragment;
  }

  var _getRelayLiteralArgum = require('./getRelayLiteralArgumentValues')(relayDirective.args),
      plural = _getRelayLiteralArgum.plural;

  require('fbjs/lib/invariant')(plural === undefined || typeof plural === 'boolean', 'RelayRelayDirectiveTransform: Expected the %s argument to @%s to be ' + 'a boolean literal or not specified.', PLURAL, RELAY);
  return (0, _extends3['default'])({}, fragment, {
    directives: fragment.directives.filter(function (directive) {
      return directive !== relayDirective;
    }),
    metadata: (0, _extends3['default'])({}, fragment.metadata || {}, {
      plural: plural
    })
  });
}

module.exports = {
  transform: transform,
  transformSchema: transformSchema
};