# Knex Relationships

User stories for RDBMS practice.


## Install

Enter the commands below in your terminal to get started:

```shell
git clone https://github.com/dev-academy-challenges/boilerplate-knex
mv boilerplate-knex knex-relationships
cd knex-relationships
yarn
yarn knex migrate:latest
yarn knex seed:run
yarn start
```

If you would like to push changes to a branch in this repository, [change](https://help.github.com/articles/changing-a-remote-s-url/) the `origin` remote to point to this repo:

```shell
git remote set-url origin https://github.com/[YOUR-COHORT-ORG]/knex-relationships-stories
```


## MVP

_As a user I want to click on a user's name and see their user profile page so that I can find out more about them._
 - This is a one to one relationship: a user _HAS ONE_ profile page.
 - You'll need a `profiles` table with a `user_id` column and some other useful information about the user, like their URL and maybe a profile picture.

_As an administrator I want to add a new user and their profile information so that I can grow my user base._
 - This will involve writing to more than one table in separate queries.
 - You should create a form to enter the user information, and a route which will be the form's action.

_As a user I want to create a blog post so that I can express myself._
  - This is a one to many relationship: a user _HAS MANY_ blog posts.
  - You'll need a `posts` table with a `user_id` column, and some named `title` and `content` that contain the post text.

_As a user I want to view a list of all blog posts for each user so that I can see what others have been writing._

_As a user I want to view a single blog post so that I can read it._


## Stretch

_As a user I want to add another user to my favourites list so that I can easily view their profile pages._
 - This is a many to many relationship: MANY users HAVE MANY favourites.
 - You'll need a `favourites` join table which has `user_id` and `favourite_id` columns.
 - Think about how you're going to add rows to this table as users add favourites to their list.

_As a user I want to filter the list of blog posts so that it only shows users who are on my favourites list._
