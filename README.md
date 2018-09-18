# Introduction

In this project, you will build a React web application called [Jammming](http://jammming.s3-website-us-east-1.amazonaws.com/). You will use your knowledge of React components, state, and requests with the Spotify API to build a website that allows users to search the Spotify library, create a custom playlist, then save it to their Spotify account.

In the linked project, we provide step-by-step instructions for completing the application on your computer. If you are looking for a challenge, try building the project using only the resources and instructions below.

# Challenge

The video, instructions, and resources below provide enough context for you to complete the Jammming project.

# Video Demonstration

The video below highlights the appearance and features of the Jammming website.
[Video](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/jammming-demonstration.mp4)

# Features

Below is a list of the website's features:

- Spotify Login — the first time a user searches for a song, album, or artist, Spotify will ask them to log in or set up a new account. You will need to follow the steps in the [Spotify Developer Guide](https://developer.spotify.com/web-api/tutorial/) to register your application.
- Search by Song, Album, or Artist — a user can type the name of a song, artist, or album into the search bar and click the SEARCH button. The app will request song data about the user's input from the Spotify library (find Spotify endpoints [here](https://developer.spotify.com/web-api/endpoint-reference/)).
- Populate Results List — Jammming displays the list of returned tracks from the user's query.
- Add Song to a Custom Playlist — users can add a track to their playlist by selecting a + sign on the right side of the track's display container.
- Remove Song from Custom Playlist — users can remove a track from their playlist by selecting a - sign on the right side of the track's display container.
- Change Playlist Title — users can change the title of their custom playlist.
- Save Playlist to Account — users can save their custom playlist by clicking a button called SAVE TO SPOTIFY.

# Resources

Because we want you to focus on building the React infrastructure, we have provided links to the HTML/CSS and visual assets below. Notice, we did not break the HTML and CSS into their components. To complete the project you will need to split the HTML/CSS into their components.

- [index.html](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/static-html-css/indexHtml.txt) — all of the HTML for a static version of the website.
- [style.css](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/static-html-css/indexCss.txt) — all of the CSS for a static version of the website.
- [image assets](https://s3.amazonaws.com/codecademy-content/programs/react/jammming/image_assets.zip) — all of the image assets used in the website.

# A final note

Whether you're up for the challenge or not, we recommend you consider the following questions before you start coding.
- What components does the application need?
- How will the application handle state?
- What methods does the application need?
- How does the application hook up to the Spotify API?
- How does the application save a playlist to a user's profile? As you complete the steps, you can compare the structure you devised to the one we use recommend in the project steps.

This is a large project. Take your time and review the earlier lessons if you run into problems. Good luck!
