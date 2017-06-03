/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayCompatMutations
 * 
 */

'use strict';

var _require = require('./RelayCompatEnvironment'),
    getRelayClassicEnvironment = _require.getRelayClassicEnvironment,
    getRelayModernEnvironment = _require.getRelayModernEnvironment;

var _require2 = require('relay-runtime'),
    commitMutation = _require2.commitMutation;

var RelayCompatMutations = {
  commitUpdate: function commitUpdate(environment, config) {
    var relayStaticEnvironment = getRelayModernEnvironment(environment);
    if (relayStaticEnvironment) {
      return commitMutation(relayStaticEnvironment, config);
    } else {
      var relayClassicEnvironment = getRelayClassicEnvironment(environment);
      require('fbjs/lib/invariant')(relayClassicEnvironment, 'RelayCompatMutations: Expected an object that conforms to the ' + '`RelayEnvironmentInterface`, got `%s`.', environment);
      return commitRelay1Mutation(
      // getRelayClassicEnvironment returns a RelayEnvironmentInterface
      // (classic APIs), but we need the modern APIs on old core here.
      relayClassicEnvironment, config);
    }
  }
};

function commitRelay1Mutation(environment, _ref) {
  var configs = _ref.configs,
      mutation = _ref.mutation,
      onCompleted = _ref.onCompleted,
      onError = _ref.onError,
      optimisticResponse = _ref.optimisticResponse,
      variables = _ref.variables,
      uploadables = _ref.uploadables;
  var getOperation = environment.unstable_internal.getOperation;

  var operation = getOperation(mutation);
  return environment.sendMutation({
    configs: configs || [],
    operation: operation,
    onCompleted: onCompleted,
    onError: onError,
    optimisticResponse: optimisticResponse && optimisticResponse(),
    variables: variables,
    uploadables: uploadables
  });
}

module.exports = RelayCompatMutations;