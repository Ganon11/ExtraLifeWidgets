This will be a project containing some tools for creating Extra Life widgets.

How to Use
==========

The widgets are controlled by JavaScript files inside the js/ directory.

The HTML for the widgets is stored in the Widgets/ directory.

You should be able to edit those files and open them in a browser like Chrome or Firefox to see the widgets in action.

Embedding Widgets in OBS
========================

* Requires the [CLRBrowser Extension](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/)
* First, download the source of this project to a location on your computer.
* The URL to use will look like `file:///C:/Path/To/ExtraLifeWidgets/Widgets/Widget.html?id=12345`
  * Replace `Path/To/ExtraLifeWidgets` with the location of the files you just downloaded.
  * Replace the `id` value with your participant or team ID as desired.
  * Make sure to include any Query String parameters the widget requires.
* Embedding a widget in OBS
  * In your scene, select `Add > CLRBrowser`
  * Use the URL from above
  * Adjust the width and height to fit on your stream
* Embedding a widget in OBS Multiplatform
  * In your scene, select `Add > BrowserSource`
  * Use the URL from above
  * Adjust the width and height to fit on your stream
  * You can use a low FPS value, since most widgets update once every 10 seconds or longer

Available Widgets
=================

* Top Donors (Participant)
  * Displays the top X donors to a participant
  * Query String Parameters
    * `id` - Numeric Participant ID
    * `topX` - Number of donors to display
      * Default is `3` donors
  * Example URL
    * `file:///C:/Source/Git%20Repos/ExtraLifeWidgets/Widgets/ParticipantTopDonors.html?id=12345&topX=3`
      * `id=12345` - Set Participant ID to 12345
      * `topX=3` - Display the highest 3 donors
* Top Donors (Team)
  * Displays the top X donors to a team
  * Query String Parameters
    * `id` - Numeric Team ID
    * `topX` - Number of donors to display
      * Default is `3` donors
  * Example URL
    * `file:///C:/Source/Git%20Repos/ExtraLifeWidgets/Widgets/TeamTopDonors.html?id=12345&topX=3`
      * `id=12345` - Set Team ID to 12345
      * `topX=3` - Display the highest 3 donors
* Goal Progress
  * Displays the progress toward the participant's / team's goal
  * Works with either team or participant
  * Query String Parameters
    * `id` - Numeric Team or Participant ID
    * `team` - Optional. Flag to control team or participant mode
      * Default is `false`
      * Omitting `team`, or setting `team=0` or `team=false` will cause the widget to act in Participant mode
      * Setting `team=1` or any other value will cause the widget to act in Team mode
  * Example URL
    * `file:///C:/Source/Git%20Repos/ExtraLifeWidgets/Widgets/Progress.html?id=12345&team=true`
      * `id=12345` - Set ID to 12345
      * `team=true` - This is a Team ID, so fetch Team Information
* Recent Donations
  * Displays the most recent X donations to a participant or team
  * Works with either team or participant
  * Query String Parameters
    * `id` - Numeric Team or Participant ID
    * `team` - Flag to control team or participant mode
      * Setting `team=` will cause the widget to act in Participant mode
      * Setting `team=1` or any other value will cause the widget to act in Team mode
    * `update` - Optional. Number of seconds to wait before fetching new information
      * Default is `10` seconds
    * `count` - Optional. Number of recent donations to show
      * Default is `5` donations
  * Example URL
    * `file:///C:/Source/Git%20Repos/ExtraLifeWidgets/Widgets/RecentDonations.html?id=12345&team=true&count=3&update=15`
      * `id=12345` - Set ID to 12345
      * `team=true` - This is a Team ID, so fetch Team Information
      * `count=3` - Display the 3 most recent donations
      * `update=15` - Fetch new information every 15 seconds.
