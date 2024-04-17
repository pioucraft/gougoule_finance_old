# Hub For Things

## Introduction

This repository is a hub for things... It's a place to store everything you want without needing to services from big tech companies.

You can self-host it yourself on your server. For now, it requires very few resources, but it will probably need more in the future.

## Features

Currently, the app is in early development. Here's the full list of the features :

1. Track the money you have (including stocks, crypto). You can also track your expenses and income, have a graph showing the history of your wealth and many more features.

Here's a list of the features I'm planning to add :

1. Store notes 
2. Have an AI (using [Ollama](https://ollama.com)) you can connect to your data and notes
2. Calendar
3. Store files
4. Have a good photos gallery

## Installation

### Dependencies

You will need to have the following apps installed on your system : 

1. Postgresql
2. Apache2 (for ProxyPass)
3. [Bun](https://bun.sh)
4. Apache2 certbot (for https certificate)

### Setup

First, clone the repository : 

`git clone https://github.com/pioucraft/hub-for-things`

Then, copy the two .env.example files (one in the backend folder and one in the frontend folder) and edit them to your needs.

You will then need to run 

`bun i`

in the frontend and backend folders

Before building the app, you'll have to create a 'backups' folder inside the backend folder, where you will store all your backups.

Finally, you will need to build the sveltekit app :

`bun run build` (inside the frontend folder)

Don't forget to create a database with the name specified in the.env file and then run the migrations :

`bun migrations` (inside the backend folder)

And run :

`bun admin.js` (inside the backend folder) 

to guide you through the user creation process.

### Run

Simply run 

`bun index.js` (inside the backend folder)

and 

`bun run preview` (inside the frontend folder)

in two different terminals and enjoy (don't forget to setup ProxyPass with apache2)!