'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ActorClient = require('../../../utils/ActorClient');

var _ActorClient2 = _interopRequireDefault(_ActorClient);

var _EmojiUtils = require('../../../utils/EmojiUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /*
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var youtubeRegEx = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function processText(text) {
  var processedText = text;

  // youtube
  if (youtubeRegEx.test(processedText)) {
    var matches = youtubeRegEx.exec(text);
    if (matches && matches.length == 2) {
      return _react2.default.createElement('iframe', { src: "https://www.youtube.com/embed/" + matches[1], style: { width: "70%" }, frameBorder: '0', allowfullscreen: true });
    }
  }

  var giphyRegEx = /(gph.is\/)(.*)|(giphy.com\/gifs\/)(.*)/;

  // giphy
  if (giphyRegEx.test(processedText)) {
    var matches = giphyRegEx.exec(text);
    if (matches && matches.length == 2) {
      console.log("giphy match hit");
      return _react2.default.createElement('iframe', { src: "//giphy.com/embed/" + matches[1], width: '480', height: '301', frameBorder: '0', 'class': 'giphy-embed', allowFullScreen: true });
    }
  }

  processedText = _ActorClient2.default.renderMarkdown(processedText);
  processedText = (0, _EmojiUtils.processEmojiText)(processedText);
  processedText = processedText.replace(/(@[0-9a-zA-Z_]{5,32})/ig, '<span class="message__mention">$1</span>');

  return _react2.default.createElement('div', { className: 'text', dangerouslySetInnerHTML: { __html: processedText } });
}

var Text = function (_Component) {
  _inherits(Text, _Component);

  function Text() {
    _classCallCheck(this, Text);

    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
  }

  Text.prototype.render = function render() {
    var _props = this.props;
    var text = _props.text;
    var className = _props.className;


    return _react2.default.createElement(
      'div',
      { className: className },
      processText(text)
    );
  };

  return Text;
}(_react.Component);

Text.propTypes = {
  text: _react.PropTypes.string.isRequired,
  className: _react.PropTypes.string
};
exports.default = Text;
//# sourceMappingURL=Text.react.js.map