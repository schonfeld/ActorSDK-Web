'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActorAppDispatcher = require('../dispatcher/ActorAppDispatcher');

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _ActorClient = require('../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  show: function show() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MY_PROFILE_MODAL_SHOW);
  },
  hide: function hide() {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MY_PROFILE_MODAL_HIDE);
  },
  onProfileChanged: function onProfileChanged(profile) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MY_PROFILE_CHANGED, { profile: profile });
  },

  // TODO: use dispatchAsync
  saveName: function saveName(name) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MY_PROFILE_SAVE_NAME, { name: name });
  },

  // TODO: use dispatchAsync
  saveNickname: function saveNickname(nick) {
    (0, _ActorAppDispatcher.dispatch)(_ActorAppConstants.ActionTypes.MY_PROFILE_SAVE_NICKNAME, { nick: nick });
  },
  editMyAbout: function editMyAbout(about) {
    (0, _ActorAppDispatcher.dispatchAsync)(_ActorClient2.default.editMyAbout(about), {
      request: _ActorAppConstants.ActionTypes.MY_PROFILE_EDIT_ABOUT,
      success: _ActorAppConstants.ActionTypes.MY_PROFILE_EDIT_ABOUT_SUCCESS,
      failure: _ActorAppConstants.ActionTypes.MY_PROFILE_EDIT_ABOUT_ERROR
    }, { about: about });
  },
  changeMyAvatar: function changeMyAvatar(newAvatar) {
    _ActorClient2.default.changeMyAvatar(newAvatar);
  },
  removeMyAvatar: function removeMyAvatar() {
    _ActorClient2.default.removeMyAvatar();
  }
}; /*
    * Copyright (C) 2015 Actor LLC. <https://actor.im>
    */