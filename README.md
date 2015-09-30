This will be a project containing some tools for creating Extra Life widgets.

How to Use
==========
On a fresh download, run the following commands to pull down all relevant dependencies:

`npm install`  
`bower install`

Now you should be good to go forth and develop!

Starting the Grunt server
=========================

* In the root directory of the `ExtraLifeWidgets` project, type `grunt`
  * This will start a web server on port `9001` of `localhost`
  * You should be able to see the widgets in action by navigating to `http://localhost:9001/Widgets/` in a browser
    * Select a Widget.html, and add the required query string arguments

Embedding Widgets in OBS
========================

* Embedding a widget in OBS
  * Requires the [CLRBrowser Extension](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/)
  * In your scene, select `Add > CLRBrowser`
  * Set the URL to the URL of the locally-hosted widget, along with the query string parameters
    * e.g. `http://localhost:9001/Widgets/Progress.html?id=12345&team=false`
  * Adjust the width and height to fit on your stream
* Embedding a widget in OBS Multiplatform
  * In your scene, select `Add > BrowserSource`
  * Set the URL to the URL of the locally-hosted widget, along with the query string parameters
    * e.g. `http://localhost:9001/Widgets/Progress.html?id=12345&team=false`
  * Adjust the width and height to fit on your stream
  * You can use a low FPS value, since most widgets update once every 10 seconds or longer

Available Widgets
=================

* Top Donors (Participant)
  * Displays the top X donors to a participant
  * Query String Parameters
    * `id` - Numeric Participant ID
    * `topX` - Number of donors to display (default `3`)
* Top Donors (Team)
  * Displays the top X donors to a team
  * Query String Parameters
    * `id` - Numeric Team ID
    * `topX` - Number of donors to display (default `3`)
* Goal Progress
  * Displays the progress toward the participant's / team's goal
  * Works with either team or participant
  * Query String Parameters
    * `id` - Numeric Team or Participant ID
    * `team` - Optional flag to control team or participant
      * The default value is `false`
      * Any value provided here is a string. So adding `team=false` or `team=0` will be interpreted as a `true` value

Upcoming Widgets
================

* Recent X Donations (Alex)
  * Given: Participant ID/Team ID
  * Retrieve: All donations
  * Sort by time
  * Display top X (5? 3?)
