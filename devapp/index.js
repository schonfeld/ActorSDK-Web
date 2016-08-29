/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import ActorSDK from '../src/sdk/actor-sdk';
import ActorSDKDelegate from '../src/sdk/actor-sdk-delegate';

const delegate = new ActorSDKDelegate({
  components: {},
  features: {
    calls: false,
    search: true,
    editing: true,
    blocking: true,
    writeButton: false
  },
  actions: {},
  l18n: {}
});

const app = new ActorSDK({
  delegate,
  endpoints: [
    'wss://ws.hyenas.sexywaffles.com:443'
  ],
  isExperimental: true,
  homePage: 'https://hyenas.sexywaffles.com',
  appName: 'SexyWaffles'
});

app.startApp();