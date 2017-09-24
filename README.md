# Foodphoria

Anytime a group of friends gets together to eat, they inevitably do some form of social dance when it comes to picking where to eat. No one person wants to step on the toes of others, which causes those people to instead defer to others to make the decision for them. Rather than continue this frustrating dance that often ends up with few people satisfied, we sought to provide a simple, easy utility that makes navigating these conflicts of interest trivial.

Broadly, our service is an web application that allows users to create shareable polls that survey the food preferences of link holders and displays the running results, using these results to eventually drive an AI that provides recommendations on where to eat. These results are only displayed with context to the group, not with details about individuals, thereby avoiding the aforementioned social balancing act. In doing so, Foodphoria looks to bring the joy back to eating out with your friends.

## Technologies Used
React, Flask, Tensorflow, Firebase, MongoDB, and Heroku

## Installation/Setup

This repository contains all of our frontend code, which interacts with both Firebase and Flask to manage user and AI informations, respectively. The backend code can be found [here], along with details describing how to setup our backend locally. 

Our core application can be accessed at https://foodphoria.herokuapp.com/. However, since our app utilizes `npm` to do most of it's package management, it is also possible to build and start the application from our source code. These steps are as follows:

1) Navigate to the root directory of this project.
2) Run `npm install`.
3) Run `npm start`.

And that's it! Note that the backend is, inherently, essential to our application, so be sure that the backend is either spun up or accessible by web before beginning this portion of the app.

## App Flow

Our app is designed to be intuitive to use on both web and mobile; to demonstrate this perk, we will walk through the different components within our application.

![home_desktop](/src/Photos/home_desktop) ![home_mobile](/src/Photos/home_mobile)
![input_desktop](/src/Photos/input_desktop) ![input_mobile](/src/Photos/input_mobile)
![results_desktop](/src/Photos/results_desktop) ![results_mobile](/src/Photos/results_mobile)
![rating_desktop](/src/Photos/rating_desktop) ![rating_mobile](/src/Photos/rating_mobile)




