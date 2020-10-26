<link href="./docs/css/main.css" rel="stylesheet"></link>

# Server-less Link Saving

## Overview

This is an application to learn Netlify Functions, Netlify's version of Lambda Functions or serverless functions. This application helps a user save links while browsing the web. The most common use for this application is while browsing on the go. Using Siri Shortcuts, I was able to add a custom option on the share sheet so that I can save the webpage to my own MongoDB instance. Then, those links that are stored are displayed on a website to be referenced at a later time, There is an option to mark a link as "read" as well as deleting links. Any links that is marked as 'read' is moved to the bottom of the list.

## Background

I've noticed a problem where I would visit a webpage, deem it helpful and would want to come back to it later. I would open a new tab to continue browsing so I can save that webpage on the previous tab. After a short while, I would have dozens of open tabs on my mobile browser. I decided to work on this issue and solved it with serverless functions. I chose Netlify as the hosting platform and MongoDB as the database provider. I also created a Siri Shortcut to enhance this application. Future development on a Google Extension will soon take place to provide additional functionality.

## Netlify Functions

Netlify offers their own flavor of serverless functions called Netlify Functions. These alow users to develop applications without needing to maintain a server. Applications are also inherently scalable and faster for the end user. Please read Netlify's documentation on Netlify Functions: [Netlify Docs (Functions)](https://docs.netlify.com/functions/overview/)

## Netlify CLI

The easiest way to develop this application is to install the Netlify CLI. Follow their official documentation to get started: [Netlify Docs (Getting Started)](https://docs.netlify.com/cli/get-started/)

## MongoDB Setup

Fake Mongo URI `mongodb+srv://demo-user:demo1234@demo.xpy84.mongodb.net/linkSaver?retryWrites=true&w=majority`

## Environment Variables

Netlify offers the use of environment variables for your applications. To add environment variables to your netlify project, navigate to the settings area for your application called `Site settings`.

Then you will need to click on `Build & deploy` on the menu on the left.

Scroll down until you reach the `Environment` section or you can `Environment` under `Build & deploy` on the same menu.

You should see this screen:

<img src="./docs/images/netlify-setup-env-01.PNG" >

Click edit to add an environment variable

<img src="./docs/images/netlify-setup-env-02.PNG" >

We are going to add our environment variable for the MongoDB connection string. If you cloned this project, I called the MongoDB connection `MONGO_URI`, however you can call it whatever suits your needs. After you filled in the Key and Value fields, click save.

Please set this up before development! When you run `netlify dev` as we talked about earlier, the dev server will grab the environment variable for your application.

For more information on Netlify Functions, please visit the official docs: [Netlify Docs (Environment Variables)](https://docs.netlify.com/configure-builds/environment-variables/)

## Siri Shortcuts Setup (optional)

### Building the Shortcut

<p><img src="./docs/images/shortcut-edit-00.PNG" style="width: 50%"><br /><span>Text</span></p><p><img src="./docs/images/shortcut-edit-01.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-02.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-03.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-04.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-05.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-06.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-07.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-08.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-08.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-09.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-10.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-11.PNG" style="width: 50%"><img src="./docs/images/shortcut-edit-12.PNG" style="width: 50%"></p>
<p><img src="./docs/images/shortcut-edit-13.PNG" style="width: 50%"></p>

### Testing the Shortcut

## Google Chrome Extension (Future)
