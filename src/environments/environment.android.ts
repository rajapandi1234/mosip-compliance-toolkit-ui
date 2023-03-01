// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  isAndroidAppMode: 'yes',
  IAM_URL: "https://iam.dev.mosip.net/auth",
  IAM_REALM: "mosip",
  IAM_CLIENT_ID: "mosip-toolkit-android-client",
  redirectUri: 'android://mosip-compliance-toolkit-ui',
  SERVICES_BASE_URL: 'http://192.168.1.7:8080/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.