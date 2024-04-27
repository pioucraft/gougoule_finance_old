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
4. Apache2 certbot (for HTTPS certificate)
5. Docker

### Setup

Start by clonning the repository with `git clone https://github.com/pioucraft/hub-for-things.git`.

Then run `cd hub-for-things`.

You can the do `cd backend && cp .env.example .env` and edit it to fit your needs (`nano .env`).

You can do the same in the frontend folder : `cd ../frontend && cp .env.example .env` and edit it to fit your needs (`nano .env`).


Afterwards, create a database on postgresql with the same name you specified in .env.

You will also need to create a config file for apache2 (in `/etc/apache2/sites-available`), create a file named `hub-for-things.conf` : 

`sudo nano /etc/apache2/sites-available/hub-for-things.conf`

Here's the code you will add :

```         
<VirtualHost *:80>
    # The ServerName directive sets the request scheme, hostname and port that
    # the server uses to identify itself. This is used when creating
    # redirection URLs. In the context of virtual hosts, the ServerName
    # specifies what hostname must appear in the request's Host: header to
    # match this virtual host. For the default virtual host (this file) this
    # value is not decisive as it is used as a last resort host regardless.
    # However, you must set it for any further virtual host explicitly.
    ServerName [YOUR_DOMAIN]

    ServerAdmin [YOUR_EMAIL]

    # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
    # error, crit, alert, emerg.
    # It is also possible to configure the loglevel for particular
    # modules, e.g.
    #LogLevel info ssl:warn

    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined

    # For most configuration files from conf-available/, which are
    # enabled or disabled at a global level, it is possible to
    # include a line for only one particular virtual host. For example the
    # following line enables the CGI configuration for this host only
    # after it has been globally disabled with "a2disconf".
    #Include conf-available/serve-cgi-bin.conf

    ProxyPass /api http://localhost:[YOUR_BACKEND_PORT (default is 3000)]/api
    ProxyPassReverse /api http://localhost:[YOUR_BACKEND_PORT (default is 3000)]/api

    ProxyPass / http://localhost:8765/
    ProxyPassReverse / http://localhost:8765/
</VirtualHost>
```

(everything inside square brackets ("[]") needs to be replaced)

You will then need to enable some plugins and restart apache2 :

```
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod lbmethod_byrequests

sudo a2ensite hub-for-things.conf

sudo systemctl restart apache2
```

If you want HTTPS, you can simply run : `sudo certbot --apache` and follow the instructions.

To install and run the Docker images, simply do :

```
cat install.sh | sudo sh
cat start.sh | sudo sh
```