'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

require('../utils/intl-polyfill');

var _RouterContainer = require('../utils/RouterContainer');

var _RouterContainer2 = _interopRequireDefault(_RouterContainer);

var _DelegateContainer = require('../utils/DelegateContainer');

var _DelegateContainer2 = _interopRequireDefault(_DelegateContainer);

var _SharedContainer = require('../utils/SharedContainer');

var _SharedContainer2 = _interopRequireDefault(_SharedContainer);

var _actorSdkDelegate = require('./actor-sdk-delegate');

var _actorSdkDelegate2 = _interopRequireDefault(_actorSdkDelegate);

var _ActorAppConstants = require('../constants/ActorAppConstants');

var _pace = require('pace');

var _pace2 = _interopRequireDefault(_pace);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouter2 = _interopRequireDefault(_reactRouter);

var _reactMixin = require('react-mixin');

var _reactMixin2 = _interopRequireDefault(_reactMixin);

var _actorJs = require('actor-js');

var _actorJs2 = _interopRequireDefault(_actorJs);

var _reactIntl = require('react-intl');

var _crosstab = require('crosstab');

var _crosstab2 = _interopRequireDefault(_crosstab);

var _ImageUtils = require('../utils/ImageUtils');

var _LoginActionCreators = require('../actions/LoginActionCreators');

var _LoginActionCreators2 = _interopRequireDefault(_LoginActionCreators);

var _LoginStore = require('../stores/LoginStore');

var _LoginStore2 = _interopRequireDefault(_LoginStore);

var _Deactivated = require('../components/Deactivated.react');

var _Deactivated2 = _interopRequireDefault(_Deactivated);

var _Login = require('../components/Login.react');

var _Login2 = _interopRequireDefault(_Login);

var _Main = require('../components/Main.react');

var _Main2 = _interopRequireDefault(_Main);

var _JoinGroup = require('../components/JoinGroup.react');

var _JoinGroup2 = _interopRequireDefault(_JoinGroup);

var _Install = require('../components/Install.react');

var _Install2 = _interopRequireDefault(_Install);

var _reactModal = require('react-modal');

var _reactModal2 = _interopRequireDefault(_reactModal);

var _l18n = require('../l18n');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

//import '../workers'

var DefaultRoute = _reactRouter2.default.DefaultRoute;
var Route = _reactRouter2.default.Route;
var RouteHandler = _reactRouter2.default.RouteHandler;

// Init app loading progressbar

_pace2.default.start({
  ajax: false,
  restartOnRequestAfter: false,
  restartOnPushState: false
});

// Init lightbox
_ImageUtils.lightbox.load({
  animation: false,
  controlClose: '<i class="material-icons">close</i>'
});

window.isJsAppLoaded = false;
window.jsAppLoaded = function () {
  return window.isJsAppLoaded = true;
};

var App = (function (_Component) {
  _inherits(App, _Component);

  _createClass(App, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        delegate: this.props.delegate,
        isExperimental: this.props.isExperimental
      };
    }
  }]);

  function App(props) {
    _classCallCheck(this, App);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));
  }

  _createClass(App, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(RouteHandler, null);
    }
  }]);

  return App;
})(_react.Component);

App.childContextTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool
};
App.propTypes = {
  delegate: _react.PropTypes.object,
  isExperimental: _react.PropTypes.bool
};

_reactMixin2.default.onClass(App, _reactIntl.IntlMixin);

/**
 * Class represents ActorSKD itself
 * @param {object} options - Object contains custom components, actions, localisation strings and etc.
 */

var ActorSDK = (function () {
  function ActorSDK() {
    var _this2 = this;

    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    _classCallCheck(this, ActorSDK);

    this._starter = function () {
      var ActorInitEvent = 'concurrentActorInit';

      if (_crosstab2.default.supported) {
        _crosstab2.default.on(ActorInitEvent, function (msg) {
          if (msg.origin !== _crosstab2.default.id && window.location.hash !== '#/deactivated') {
            window.location.assign('#/deactivated');
            window.location.reload();
          }
        });
      }

      var appRootElemet = document.getElementById(_this2.rootElement);

      // initial setup fot react modal
      _reactModal2.default.setAppElement(appRootElemet);

      if (window.location.hash !== '#/deactivated') {
        if (_crosstab2.default.supported) _crosstab2.default.broadcast(ActorInitEvent, {});
        window.messenger = _actorJs2.default.create(_this2.endpoints);
      }

      var Login = _this2.delegate.components.login || _Login2.default;
      var Deactivated = _this2.delegate.components.deactivated || _Deactivated2.default;
      var Install = _this2.delegate.components.install || _Install2.default;
      var JoinGroup = _this2.delegate.components.joinGroup || _JoinGroup2.default;
      var intlData = (0, _l18n.getIntlData)(_this2.forceLocale);

      var routes = _react2.default.createElement(
        Route,
        { handler: App, name: 'app', path: '/' },
        _react2.default.createElement(Route, { handler: Login, name: 'login', path: '/auth' }),
        _react2.default.createElement(Route, { handler: _Main2.default, name: 'main', path: '/im/:id' }),
        _react2.default.createElement(Route, { handler: JoinGroup, name: 'join', path: '/join/:token' }),
        _react2.default.createElement(Route, { handler: Deactivated, name: 'deactivated', path: '/deactivated' }),
        _react2.default.createElement(Route, { handler: Install, name: 'install', path: '/install' }),
        _react2.default.createElement(DefaultRoute, { handler: _Main2.default })
      );

      var router = _reactRouter2.default.create(routes, _reactRouter2.default.HashLocation);

      _RouterContainer2.default.set(router);

      router.run(function (Root) {
        return _react2.default.render(_react2.default.createElement(Root, _extends({}, intlData, { delegate: _this2.delegate, isExperimental: _this2.isExperimental })), appRootElemet);
      });

      if (window.location.hash !== '#/deactivated') {
        if (_LoginStore2.default.isLoggedIn()) _LoginActionCreators2.default.setLoggedIn({ redirect: false });
      }
    };

    this.endpoints = options.endpoints && options.endpoints.length > 0 ? options.endpoints : _ActorAppConstants.endpoints;
    this.isExperimental = options.isExperimental ? options.isExperimental : false;
    this.forceLocale = options.forceLocale ? options.forceLocale : null;
    this.rootElement = options.rootElement ? options.rootElement : _ActorAppConstants.rootElement;
    this.homePage = options.homePage ? options.homePage : _ActorAppConstants.homePage;
    this.twitter = options.twitter ? options.twitter : _ActorAppConstants.twitter;
    this.helpPhone = options.helpPhone ? options.helpPhone : _ActorAppConstants.helpPhone;
    this.appName = options.appName ? options.appName : _ActorAppConstants.appName;
    this.delegate = options.delegate ? options.delegate : new _actorSdkDelegate2.default();

    _DelegateContainer2.default.set(this.delegate);

    if (this.delegate.l18n) (0, _l18n.extendL18n)();

    _SharedContainer2.default.set(this);
  }

  _createClass(ActorSDK, [{
    key: 'startApp',

    /**
     * Start application
     */
    value: function startApp() {
      if (window.isJsAppLoaded) {
        this._starter();
      } else {
        window.jsAppLoaded = this._starter;
      }
    }
  }]);

  return ActorSDK;
})();

exports.default = ActorSDK;
//# sourceMappingURL=actor-sdk.js.map