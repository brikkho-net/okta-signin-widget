const FORMS = {
  IDENTIFY: 'identify',
  SELECT_IDENTIFY: 'select-identify',
  SELECT_ENROLL_PROFILE: 'select-enroll-profile',
  ENROLL_PROFILE: 'enroll-profile',

  SELECT_AUTHENTICATOR_AUTHENTICATE: 'select-authenticator-authenticate',
  AUTHENTICATOR_VERIFICATION_DATA: 'authenticator-verification-data',
  CHALLENGE_AUTHENTICATOR: 'challenge-authenticator',
  // will be used later when API got refactor'ed.
  // SELECT_AUTHENTICATOR_AUTHENTICATE_DATA: 'select-authenticator-authenticate-data',

  SELECT_AUTHENTICATOR_ENROLL: 'select-authenticator-enroll',
  SELECT_AUTHENTICATOR_ENROLL_DATA: 'select-authenticator-enroll-data',
  ENROLL_AUTHENTICATOR: 'enroll-authenticator',
  SKIP: 'skip',

  SUCCESS_REDIRECT: 'success-redirect',
  REDIRECT_IDP: 'redirect-idp',

  DEVICE_CHALLENGE_POLL: 'device-challenge-poll',
  DEVICE_APPLE_SSO_EXTENSION: 'device-apple-sso-extension',
  CANCEL_TRANSACTION: 'cancel-transaction',
  LAUNCH_AUTHENTICATOR: 'launch-authenticator',
};

const NEED_HIDE_CANCEL_FORMS = [
  FORMS.IDENTIFY,
  FORMS.SUCCESS_REDIRECT,
  FORMS.ENROLL_PROFILE,
  FORMS.SELECT_AUTHENTICATOR_ENROLL,
  FORMS.SELECT_AUTHENTICATOR_ENROLL_DATA,
  FORMS.ENROLL_AUTHENTICATOR,
  FORMS.REDIRECT_IDP,
];

export default {
  FORMS,
  NEED_HIDE_CANCEL_FORMS,
};
