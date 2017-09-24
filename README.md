# Foodphoria

Anytime a group of friends gets together to eat, they inevitably do some form of social dance when it comes to picking where to eat. No one person wants to step on the toes of others, which causes those people to instead defer to others to make the decision for them. Rather than continue this frustrating dance that often ends up with few people satisfied, we sought to provide a simple, easy utility that makes navigating these conflicts of interest trivial.

Broadly, our service is an web application that allows users to create shareable polls that survey the food preferences of link holders and displays the running results, using these results to eventually drive an AI that provides recommendations on where to eat. These results are only displayed with context to the group, not with details about individuals, thereby avoiding the aforementioned social balancing act. In doing so, Foodphoria looks to bring the joy back to eating out with your friends.

## Technologies Used
React, Flask, TensorFlow, Firebase, MongoDB, and Heroku

## Installation/Setup

This repository contains all of our frontend code, which interacts with both Firebase and Flask to manage user and AI informations, respectively. The backend code can be found [here], along with details describing how to setup our backend locally. 

Our core application can be accessed at https://foodphoria.herokuapp.com/. However, since our app utilizes `npm` to do most of it's package management, it is also possible to build and start the application from our source code. These steps are as follows:

1) Navigate to the root directory of this project.
2) Run `npm install`.
3) Run `npm start`.

And that's it! Note that the backend is, inherently, essential to our application, so be sure that the backend is either spun up or accessible by web before beginning this portion of the app.

## App Flow

Our app is designed to be intuitive to use on both web and mobile, with a general goal to optimize mobile since we forsaw that most usres would likely access our application via their phone. To demonstrate how this affected our design, we will walk through most of the different components within our application.

![home_desktop](/src/Photos/home_desktop.png) ![home_mobile](/src/Photos/home_mobile.png)

The home page is fairly standard, with our company logo scaled to the screen size and a navigation bar that makes swapping between portions of the application easier. Clicking the button on the screen allows a user to generate a poll and begin the actual process of determining a place to eat.

![input_desktop](/src/Photos/input_desktop.png) ![input_mobile](/src/Photos/input_mobile.png)

This page is the primary form of individualized feedback, in which each user can insert between one and three preferences in ranked order. These rankings are used to weight their preferences and help display the representation of each food option within the groups' interests. Note that there are a large number of food options, many of which may seem redundant. In practice, we don't anticipate that most will be used, but our searches for what we could differentiate between using Google suggestions indicated that we could feasibly use this many food descriptors without too much overlap. Also note that this link can be shared with friends to allow them to vote in a similar fashion, though no user should be allowed to vote twice.

![results_desktop](/src/Photos/results_desktop.png) ![results_mobile](/src/Photos/results_mobile.png)

This page is viewable for all voters from the last page and displays how the weighted preferences of each individual stacks up to the group's overall weighted preferences. This ranking of preferences is displayed in a scrollable list with colored bars helping visualize roughly how preferred a given food is within a group. At any point in this process, it is possible to either create a new poll or invite someone to an existing poll. The AI portion of our application is all contained within the calls spawned by the recommendation button and are the subject of the next section.

![rating_desktop](/src/Photos/rating_desktop.png) ![rating_mobile](/src/Photos/rating_mobile.png)

When pressed, we call Flask to take up to the current 4 most popular preferences and determine a restaurant relatively nearby that best satisfies those interests. Obviously, such a decision is difficult to make, so we utilized TensorFlow to perform machine learning and improve the quality of these recommendations. To do this learning, after a recommendation is determined, we solicit a rating from the user indicating whether or not that recommendation was relevant. This rating allows us to determine positive/negative feedback that can be used to control weightings and slowly guide the AI to recognize what food spots are a good match for a given set of 4 preferences.

Obviously, these types of performance gains due to machine learning will not be overwhelmingly visible with the small datasets we were able to generate during development. However, it is more the initiative we are interested in than a pure result, as we see value in n independent, intelligent entity that helps settle the frustrating quibbles over restaurant choices that plague our precious social lives.



