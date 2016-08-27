/*
 * Copyright (C) 2015-2016 Actor LLC. <https://actor.im>
 */

import React, { Component, PropTypes } from 'react';
import { Container } from 'flux/utils';
import classnames from 'classnames';
import SharedContainer from '../utils/SharedContainer';
import { appName, AuthSteps } from '../constants/ActorAppConstants';
import { FormattedMessage } from 'react-intl';

import LoginActionCreators from '../actions/LoginActionCreators';

import LoginStore from '../stores/LoginStore';

import TextField from './common/TextField.react';

class Login extends Component {
  constructor(props) {
    super(props);

    LoginActionCreators.start();

    const SharedActor = SharedContainer.get();
    this.appName = SharedActor.appName ? SharedActor.appName : appName;
  }

  static getStores() {
    return [LoginStore];
  }

  static calculateState() {
    return {
      login: LoginStore.getLogin(),
      code: LoginStore.getCode(),
      name: LoginStore.getName(),
      step: LoginStore.getStep(),
      errors: LoginStore.getErrors(),
      isCodeRequested: LoginStore.isCodeRequested(),
      isCodeSended: LoginStore.isCodeSended(),
      isSignupStarted: LoginStore.isSignupStarted()
    }
  }

  static contextTypes = {
    intl: PropTypes.object
  };

  componentDidMount() {
    this.handleFocus();
  }

  componentDidUpdate() {
    this.handleFocus();
  }

  // From change handlers
  onLoginChange = event => {
    event.preventDefault();
    LoginActionCreators.changeLogin(event.target.value);
  };
  onCodeChange = event => {
    event.preventDefault();
    LoginActionCreators.changeCode(event.target.value);
  };
  onNameChange = event => {
    event.preventDefault();
    LoginActionCreators.changeName(event.target.value);
  };

  // Form submit handlers
  onRequestCode = event => {
    event.preventDefault();
    LoginActionCreators.requestCode(this.state.login);
  };
  onSendCode = event => {
    event.preventDefault();
    LoginActionCreators.sendCode(this.state.code);
  };
  onSignupRequested = event => {
    event.preventDefault();
    LoginActionCreators.sendSignup(this.state.name);
  };

  handleRestartAuthClick = event => {
    event.preventDefault();
    LoginActionCreators.restartAuth();
  };

  handleFocus = () => {
    const { step } = this.state;

    switch (step) {
      case AuthSteps.LOGIN_WAIT:
        this.refs.login.focus();
        break;
      case AuthSteps.CODE_WAIT:
        this.refs.code.focus();
        break;
      case AuthSteps.NAME_WAIT:
        this.refs.name.focus();
        break;
      default:
    }
  };

  render() {
    const { step, errors, login, code, name, isCodeRequested, isCodeSended, isSignupStarted } = this.state;
    const { intl } = this.context;

    let requestFormClassName = classnames('login-new__forms__form', 'login-new__forms__form--request', {
      'login-new__forms__form--active': step === AuthSteps.LOGIN_WAIT,
      'login-new__forms__form--done': step !== AuthSteps.LOGIN_WAIT && isCodeRequested
    });
    let checkFormClassName = classnames('login-new__forms__form', 'login-new__forms__form--check', {
      'login-new__forms__form--active': step === AuthSteps.CODE_WAIT && isCodeRequested,
      'login-new__forms__form--done': step !== AuthSteps.CODE_WAIT && isCodeSended
    });
    let signupFormClassName = classnames('login-new__forms__form', 'login-new__forms__form--signup', {
      'login-new__forms__form--active': step === AuthSteps.NAME_WAIT
    });

    const spinner = (
      <div className="spinner">
        <div/><div/><div/><div/><div/><div/>
        <div/><div/><div/><div/><div/><div/>
      </div>
    );

    return (
      <section className="login-new row center-xs middle-xs">
        <div className="login-new__welcome col-xs row center-xs middle-xs">
          <article>
            <h1 className="login-new__heading">
              <img alt={`${this.appName} messenger`}
                   src="assets/images/logo.png"
                   srcSet="assets/images/logo@2x.png 2x"/>
            </h1>
          </article>
        </div>

        <div className="login-new__forms col-xs-6 col-md-4 row center-xs middle-xs">
          <div>
            <h1 className="login-new__heading"><FormattedMessage id="login.signIn"/></h1>

            <form className={requestFormClassName} onSubmit={this.onRequestCode}>
              <a className="wrong" onClick={this.handleRestartAuthClick}><FormattedMessage id="login.wrong"/></a>
              <TextField className="login-new__forms__form__input input__material--wide"
                         disabled={isCodeRequested || step !== AuthSteps.LOGIN_WAIT}
                         errorText={errors.login}
                         floatingLabel={intl.messages['login.email']}
                         onChange={this.onLoginChange}
                         ref="login"
                         value={login}/>
              <footer className="text-center">
                <button className="button button--rised button--wide"
                        type="submit"
                        disabled={isCodeRequested}>
                  <FormattedMessage id="button.requestCode"/>
                  {isCodeRequested ? spinner : null}
                </button>
              </footer>
            </form>

            <form className={checkFormClassName} onSubmit={this.onSendCode}>
              <TextField className="login-new__forms__form__input input__material--wide"
                         disabled={isCodeSended || step !== AuthSteps.CODE_WAIT}
                         errorText={errors.code}
                         floatingLabel={intl.messages['login.authCode']}
                         onChange={this.onCodeChange}
                         ref="code"
                         type="text"
                         value={code}/>
              <footer className="text-center">
                <button className="button button--rised button--wide"
                        type="submit"
                        disabled={isCodeSended}>
                  <FormattedMessage id="button.checkCode"/>
                  {isCodeSended ? spinner : null}
                </button>
              </footer>
            </form>

            <form className={signupFormClassName} onSubmit={this.onSignupRequested}>
              <TextField className="login-new__forms__form__input input__material--wide"
                         disabled={isSignupStarted || step === AuthSteps.COMPLETED}
                         errorText={errors.signup}
                         floatingLabel={intl.messages['login.yourName']}
                         onChange={this.onNameChange}
                         ref="name"
                         type="text"
                         value={name}/>
              <footer className="text-center">
                <button className="button button--rised button--wide"
                        type="submit"
                        disabled={isSignupStarted}>
                  <FormattedMessage id="button.signUp"/>
                  {isSignupStarted ? spinner : null}
                </button>
              </footer>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Container.create(Login, { pure: false, withProps: true });
