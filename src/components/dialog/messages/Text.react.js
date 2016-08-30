/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import ActorClient from '../../../utils/ActorClient';

import { processEmojiText } from '../../../utils/EmojiUtils';

var youtubeRegEx = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;

function processText(text) {
  let processedText = text;

  if(youtubeRegEx.test(processedText)) {
    var matches = youtubeRegEx.exec(text);
    if(matches && matches.length == 2) {
      return <iframe src={"https://www.youtube.com/embed/" + matches[1]} style={{width: "70%"}} frameBorder="0" allowfullscreen></iframe>
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
