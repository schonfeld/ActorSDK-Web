/*
 * Copyright (C) 2015 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import MessageActionCreators from '../../../actions/MessageActionCreators';

import Tooltip from 'rc-tooltip';
import ActorClient from '../../../utils/ActorClient';

class MessageReactions extends Component {
  static propTypes = {
    peer: PropTypes.object.isRequired,
    message: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      canAnimateHeart: true
    };
  }

  componentWillReceiveProps() {
    if (this.state.isThisMyReaction) {
      this.setState({
        canAnimateHeart: false,
        isThisMyReaction: false
      })
    } else {
      this.setState({ canAnimateHeart: true })
    }
  }

  handleAddLike = () => {
    MessageActionCreators.addLike(this.props.peer, this.props.message.rid);
    this.setState({ isThisMyReaction: true })
  };
  handleRemoveLike = () => {
    MessageActionCreators.removeLike(this.props.peer, this.props.message.rid);
    this.setState({ isThisMyReaction: true })
  };

  render() {
    const { message } = this.props;
    const { canAnimateHeart } = this.state;
    const hasReactions = message.reactions.length > 0;

    let counter;
    let icon = <i className="icon icon-favorite material-icons" onClick={this.handleAddLike}></i>;
    let reactionsClassName = 'message__actions__like';
    let likers = '(nobody)';

    if (hasReactions) {
      const amILikeThat = message.reactions[0].isOwnSet;

      reactionsClassName = classnames(reactionsClassName, {
        'message__actions__like--has-reactions': hasReactions,
        'message__actions__like--liked': amILikeThat,
        'message__actions__like--with-animations': canAnimateHeart
      });

      if (amILikeThat) {
        icon = <i className="icon icon-favorite material-icons" onClick={this.handleRemoveLike}></i>
      }

      if (message.reactions[0].uids.length > 0) {
        likers = message.reactions[0].uids.map(uid => ActorClient.getUser(uid)).map(user => user.nick || user.name || user.id).join(", ")
        counter = <span className="counter" key={1}>{message.reactions[0].uids.length}</span>;
      } else {
        counter = null
      }
    }

    return (
      <div className={reactionsClassName}>
        <Tooltip
          placement="left"
          mouseEnterDelay={0}
          mouseLeaveDelay={0}
          overlay={`Liked by: ${likers}`}>
          <div>
            <CSSTransitionGroup transitionName="counter" transitionEnterTimeout={125} transitionLeaveTimeout={100}>
              {counter}
            </CSSTransitionGroup>
            {icon}
          </div>
        </Tooltip>
      </div>
    )
  }
}

export default MessageReactions;
