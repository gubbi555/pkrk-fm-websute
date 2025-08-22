const awsconfig = {
  aws_project_region: 'ap-south-1',
  aws_cognito_region: 'ap-south-1',
  aws_user_pools_id: process.env.REACT_APP_USER_POOL_ID || 'ap-south-1_XXXXXXXXX',
  aws_user_pools_web_client_id: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID || 'XXXXXXXXXXXXXXXXXXXXXXXXXX',
  oauth: {},
  aws_cognito_username_attributes: ['EMAIL'],
  aws_cognito_social_providers: [],
  aws_cognito_signup_attributes: ['EMAIL'],
  aws_cognito_mfa_configuration: 'OFF',
  aws_cognito_mfa_types: [],
  aws_cognito_password_protection_settings: {
    passwordPolicyMinLength: 8,
    passwordPolicyCharacters: []
  },
  aws_cognito_verification_mechanisms: ['EMAIL']
};

export default awsconfig;
