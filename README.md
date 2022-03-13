**#CA Game Engine **

**PPBG Gaming Application**

## Installing

LEMP is a variation of the ubiquitous LAMP stack used for developing and deploying web applications. Traditionally, LAMP consists of Linux, Apache, MySQL, and PHP. Due to its modular nature, the components can easily be swapped out. With LEMP, Apache is replaced with the lightweight yet powerful Nginx.


Script use Laravel framework which utilizes Composer to manage its dependencies. So, before using
Laravel, make sure you have ``Composer`` installed on your machine.


First you need to upload files to Server then give write permission to Webserver which is run by
    ``www-data`` user group to following directory ``bootstrap`` and ``storage``
    folder.

Copy the ``.env.example`` file and rename it into the ``env`` file. it can be done with command too, by this command.


```cp .env.example .env```

run following command from terminal in where you uploaded files

```composer install --no-dev```

Wait for the process to finish then run this command 

```php artisan key:genreate```

build assets 
 ```npm install && npm run dev```
 
 #Frontend
 https://github.com/Cyberiaaxis/Rockwood/tree/master/resources/js


or 
    clone the project 
```composer install``` --no-dev only
```npm install && npm run dev```

