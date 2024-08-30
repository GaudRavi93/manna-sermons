export const GlobalConstant = Object.freeze({
  ACCESS_TOKEN: 'manna_access_token',
  REFRESH_TOKEN: 'manna_refresh_token',
  LOGIN: 'manna_login',
  PASSWORD: 'manna_pass',
  CLIENT_ID: '1bPwyWy8xKyU-jF87-5wkdU2EsYZAedn17LFmeSXpOo',
  CLIENT_SECRET: 'VhwXbJT2FvP6yRm-d52yLJUaMEjimPCPRhVz8IT5ZJU',
  TIME_FOR_VIDEO_VIEW: 600,
  CANT_LOGIN: 'Can\'t login',
  UNABLE_TO_REGISTER: 'Unable to register',
  SUBSCRIPTION_PRODUCT_NAME: 'com.mannasermons.manna.monthly',
  SUBSCRIPTION_START_DATE: 'manna_start_subscription',
  SUBSCRIPTION_PERIOD_DAY: 31,
  DISCONNECT_TIME_DETECT: 7000,
  PUSH_TOKEN: 'ma_push_token'
});

export const URLS = Object.freeze({
  EULA: 'https://mannasermons.com/eula/',
  PRIVACY_POLICY: 'https://mannasermons.com/privacy/',
  HELP_CENTER:  'https://mannasermons.com/help-center/',
  LEGAL_INFORMATION: 'https://mannasermons.com/legal-information/'
});

export const Provider = Object.freeze({
  GOOGLE: 'google',
  APPLE: 'apple',
  FACEBOOK: 'facebook'
})

export interface IPopupText {
  title: string;
  text: string;
}

export const popupText = Object.freeze({
  SUBSCRIBE_TEXT: {
    title: '',
    text: 'Subscribe for further Manna app use'
  },
  UNFOLLOW_PASTOR: {
    title: 'Unfollow this Pastor?',
    text: 'Are you sure? By unfollowing you will no longer receive notifications when additional sermons from this pastor become available. '
  } as IPopupText,
  UNLIKE_SERMON: {
    title: 'Remove from Favorites?',
    text: 'Are you sure? By removing this sermon from your favorites list, it will no longer be saved as a favorite sermon.'
  } as IPopupText,
  LOGOUT : {
    title: 'Logout',
    text: 'Are you sure you want to log out?'
  } as IPopupText,
  UNSUBSCRIBE : {
    title: 'Cancel Subscription',
    text: 'Are you sure? By canceling, your church home/affiliation will no longer receive 20% of your subscription ☹'
  } as IPopupText,
});

export const States = [
  { value: 'AK', name: 'Alaska'},
  { value: 'TX', name: 'Texas'},
  { value: 'AL', name: 'Alabama'},
  { value: 'AR', name: 'Arkansas'},
  { value: 'AZ', name: 'Arizona'},
  { value: 'CA', name: 'California'},
  { value: 'CO', name: 'Colorado'},
  { value: 'CT', name: 'Connecticut'},
  { value: 'DC', name: 'DistrictofColumbia'},
  { value: 'DE', name: 'Delaware'},
  { value: 'FL', name: 'Florida'},
  { value: 'GA', name: 'Georgia'},
  { value: 'HI', name: 'Hawaii'},
  { value: 'IA', name: 'Iowa'},
  { value: 'ID', name: 'Idaho'},
  { value: 'IL', name: 'Illinois'},
  { value: 'IN', name: 'Indiana'},
  { value: 'KS', name: 'Kansas'},
  { value: 'KY', name: 'Kentucky'},
  { value: 'LA', name: 'Louisiana'},
  { value: 'MA', name: 'Massachusetts'},
  { value: 'MD', name: 'Maryland'},
  { value: 'ME', name: 'Maine'},
  { value: 'MI', name: 'Michigan'},
  { value: 'MN', name: 'Minnesota'},
  { value: 'MO', name: 'Missouri'},
  { value: 'MS', name: 'Mississippi'},
  { value: 'MT', name: 'Montana'},
  { value: 'NC', name: 'NorthCarolina'},
  { value: 'ND', name: 'NorthDakota'},
  { value: 'NE', name: 'Nebraska'},
  { value: 'NH', name: 'NewHampshire'},
  { value: 'NJ', name: 'NewJersey'},
  { value: 'NM', name: 'NewMexico'},
  { value: 'NV', name: 'Nevada'},
  { value: 'NY', name: 'NewYork'},
  { value: 'OH', name: 'Ohio'},
  { value: 'OK', name: 'Oklahoma'},
  { value: 'OR', name: 'Oregon'},
  { value: 'PA', name: 'Pennsylvania'},
  { value: 'RI', name: 'RhodeIsland'},
  { value: 'SC', name: 'SouthCarolina'},
  { value: 'SD', name: 'SouthDakota'},
  { value: 'TN', name: 'Tennessee'},
  { value: 'TX', name: 'Texas'},
  { value: 'UT', name: 'Utah'},
  { value: 'VA', name: 'Virginia'},
  { value: 'VT', name: 'Vermont'},
  { value: 'WA', name: 'Washington'},
  { value: 'WI', name: 'Wisconsin'},
  { value: 'WV', name: 'WestVirginia'},
  { value: 'WY', name: 'Wyoming'}
];

export const Ages = [
  {value: '<18', name: 'Under 18 years old'},
  {value: '18-24', name: '18-24'},
  {value: '25-34', name: '25-34'},
  {value: '35-44', name: '35-44'},
  {value: '45-54', name: '45-54'},
  {value: '55-64', name: '55-64'},
  {value: '65-74', name: '65-74'},
  {value: '>75', name: '75 years or older'}
];

export const Gender = [
  {value: 'Male', name: 'Male'},
  {value: 'Female', name: 'Female'}
]