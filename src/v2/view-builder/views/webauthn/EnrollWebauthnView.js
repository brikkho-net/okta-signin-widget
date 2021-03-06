import { _, loc, createCallout, createButton } from 'okta';
import BaseForm from '../../internals/BaseForm';
import BaseFactorView from '../shared/BaseFactorView';
import webauthn from '../../../../util/webauthn';
import CryptoUtil from '../../../../util/CryptoUtil';
import EnrollWebauthnInfoView from './EnrollWebauthnInfoView';

function getExcludeCredentials (credentials = []) {
  return credentials.map((credential) => {
    return {
      type: 'public-key',
      id: CryptoUtil.strToBin(credential.id),
    };
  });
}

const Body = BaseForm.extend({
  title: loc('oie.enroll.webauthn.title', 'login'),
  className: 'oie-webauthn',
  modelEvents: {
    'error': '_stopEnrollment',
  },
  getUISchema () {
    const schema = [];
    // Returning custom array so no input fields are displayed for webauthn
    if (webauthn.isNewApiAvailable()) {
      schema.push({
        View: EnrollWebauthnInfoView,
      });
      schema.push({
        View: createButton({
          className: 'webauthn-setup button button-primary button-wide',
          title: loc('oie.enroll.webauthn.save', 'login'),
          click: () => {
            this.triggerWebauthnPrompt();
          },
        }),
      });
    } else {
      schema.push({
        View: createCallout({
          className: 'webauthn-not-supported',
          type: 'error',
          subtitle: loc('oie.enroll.webauthn.error.not.supported', 'login'),
        }),
      });
    }
    return schema;
  },
  triggerWebauthnPrompt () {
    this.$el.find('.o-form-error-container').empty();
    this._startEnrollment();
    const activationData = this.options.appState.get('currentAuthenticator').contextualData.activationData;
    if (webauthn.isNewApiAvailable()) {
      var options = _.extend({}, activationData, {
        challenge: CryptoUtil.strToBin(activationData.challenge),
        user: {
          id: CryptoUtil.strToBin(activationData.user.id),
          name: activationData.user.name,
          displayName: activationData.user.displayName
        },
        excludeCredentials: getExcludeCredentials(activationData.excludeCredentials)
      });
      this.webauthnAbortController = new AbortController();
      navigator.credentials.create({
        publicKey: options,
        signal: this.webauthnAbortController.signal
      }).then((newCredential) => {
        this.model.set({
          credentials : {
            clientData: CryptoUtil.binToStr(newCredential.response.clientDataJSON),
            attestation: CryptoUtil.binToStr(newCredential.response.attestationObject),
          }
        });
        this.saveForm(this.model);
      })
        .catch((error) => {
          this.model.trigger('error', this.model, {responseJSON: {errorSummary: error.message}});
        }).finally(() => {
          this.webauthnAbortController = null;
        });
    }
  },
  _startEnrollment: function () {
    this.$('.okta-waiting-spinner').show();
    this.$('.webauthn-setup').hide();
  },

  _stopEnrollment: function () {
    this.$('.okta-waiting-spinner').hide();
    this.$('.webauthn-setup').show();
  },
});

export default BaseFactorView.extend({
  Body,
  postRender () {
    BaseFactorView.prototype.postRender.apply(this, arguments);
    this.$el.find('.o-form-button-bar [type="submit"]').remove();
  }, 
});
