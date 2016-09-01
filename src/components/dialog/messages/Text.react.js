/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import ActorClient from '../../../utils/ActorClient';

import { processEmojiText } from '../../../utils/EmojiUtils';

var youtubeRegEx = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function processText(text) {
  let processedText = text;

  // youtube
  if(youtubeRegEx.test(processedText)) {
    var matches = youtubeRegEx.exec(text);
    if(matches && matches.length == 2) {
      return <iframe src={"https://www.youtube.com/embed/" + matches[1]} style={{width: "70%"}} frameBorder="0" allowfullscreen></iframe>
    }
  }

  // giphy
  var giphyRegex = /giphy.com\/gifs\/(?:[^-]*-)?([^\/]*)/ // long form urls are fine to convert

  if (/gph.is\/(.*)/.exec(text)) { return "I am a dumb idiot for using the giphy short url"; }

  if (giphyRegex.test(processedText)) {
    var matches = giphyRegex.exec(text);
    if(matches && matches.length == 2) {
      return <iframe src={"//giphy.com/embed/" + matches[1]} width="480" height="301" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    }
  }

  processedText = ActorClient.renderMarkdown(processedText);
  processedText = processEmojiText(processedText);
  processedText = processedText.replace(/(@[0-9a-zA-Z_]{5,32})/ig, '<span class="message__mention">$1</span>');

  return <div className="text" dangerouslySetInnerHTML={{ __html: processedText }}/>;
}

class Text extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    className: PropTypes.string
  };

  render() {
    const { text, className } = this.props;

    return (
      <div className={className}>
        {processText(text)}
      </div>
    );
  }
}

export default Text;
