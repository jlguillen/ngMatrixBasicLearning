Tutorial:
https://cloud.google.com/nodejs/getting-started/hello-world

1. Install the Google Cloud SDK.
  - To install on Linux or Mac OS X, run the following commands:
      + $ curl https://sdk.cloud.google.com | bash
      + $ exec -l $SHELL
  - Run the following command to authorize the SDK and configure your project:
      + $ gcloud init

2. Enter this command to deploy the app:
   - $ gcloud preview app deploy app.yaml --promote

3. In the AppEngine panel: (https://console.developers.google.com)
  - Versiones -> List of the versions, order by date.
  - IMPORTANT: The first version (java) must always be the default version.

4. Details
  - Package.json:
    + "engines": {
        "node": ">=0.12.7"
      }
    + "scripts": {
      "start": "node server.js",
      "deploy": "gcloud preview app deploy app.yaml"
      }
