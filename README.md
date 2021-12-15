# Lumen PHP Framework

[![Build Status](https://travis-ci.org/laravel/lumen-framework.svg)](https://travis-ci.org/laravel/lumen-framework)
[![Total Downloads](https://img.shields.io/packagist/dt/laravel/framework)](https://packagist.org/packages/laravel/lumen-framework)
[![Latest Stable Version](https://img.shields.io/packagist/v/laravel/framework)](https://packagist.org/packages/laravel/lumen-framework)
[![License](https://img.shields.io/packagist/l/laravel/framework)](https://packagist.org/packages/laravel/lumen-framework)

Laravel Lumen is a stunningly fast PHP micro-framework for building web applications with expressive, elegant syntax. We believe development must be an enjoyable, creative experience to be truly fulfilling. Lumen attempts to take the pain out of development by easing common tasks used in the majority of web projects, such as routing, database abstraction, queueing, and caching.

## Official Documentation

Documentation for the framework can be found on the [Lumen website](https://lumen.laravel.com/docs).

## Contributing

Thank you for considering contributing to Lumen! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Security Vulnerabilities

If you discover a security vulnerability within Lumen, please send an e-mail to Taylor Otwell at taylor@laravel.com. All security vulnerabilities will be promptly addressed.

## License

The Lumen framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Install on local repository

to clone this back-end API you can use with this command:

```
git clone -b master https://github.com/superMiii/capstone-project.git
```

or you can pull or fork this back-end project whatever you want

After that, we can duplicate and rename `.env.example` to `.env`. (the function of this file to configure your database connection, just like laravel project).

After finishing configuring the `.env` file. you can open a terminal and type the command:

```
composer install
```

(this command will install dependencies which are in `composer.json` file)
of course the above command can only be done if your computer has the installed a composer library.

after that, you can type command:

```
php artisan migrate --seed
```

(This command will create a new table in the database you configured earlier, and also create a new record for each table. each record has random data because i use `faker` library from laravel lumen).

after that you can run the API lumen from localhost with this command:

```
php -S localhost:8000/ -t public
```

## Documentation API

And this for API Documentation Website Share My Events [Documentation SME API From Postman](https://documenter.getpostman.com/view/12251477/UVJfjFdA).

## Deployed API to Heroku

And this url some endpoint for get all events [SME Heroku](https://sme-capstone-backend.herokuapp.com/api/v1/events).

And this url some endpoint for get one event [SME Heroku](https://sme-capstone-backend.herokuapp.com/api/v1/events/2).

For complete endpoints, see the documentation API.
