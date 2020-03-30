# LAB: Auth

Create an application that can signup, login, and verify a user.

## Before you begin

Refer to *Getting Started*  in the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for complete setup, configuration, deployment, and submission instructions.

## Requirements

### Signup

A user should be able to signup to your application.

### Login

A user should be able to login to your application.

### Verify

A user should be able to verify that they have signed in already.

### BONUS:

1. Create CRUD routes for another model. A user must be logged in
  in order to create, update, or delete a document.
1. Create a simple front-end that allows a user to signup/login
  to your application
1. Write a brute force script that searches through a list of
  the most common passwords.

## Assignment Submission Instructions

Refer to the the [lab submission instructions](../../../reference/submission-instructions/labs/README.md) for the complete lab submission process and expectations


# Auth

* lab
* 3 parts
  * identification
  * session
  * interaction
* architecture
  * signin, login routes (interaction from identification to session)
  * verify route (interaction to check session)
  * ensureAuth middleware (interaction to check session)
  * hash password with bcrypt with virtual (identification)
  * check email and password with bcrypt, authenticate instance method (identification)
  * create auth token with jwt (session)
  * findByToken static method
* bcrypt experimentation
  * parts of hash (version, salt, hash)
  * why?
    * clear password text (anyone can steal)
    * basic hash without salt (rainbow table)
    * hash with salt (rainbow table once hash stolen, create user all users with same hash have same password)
    * hash with random salt (brute force)
    * slower is better
* jwt experimentation
* steps
  * hash password with virtual
  * create auth token with jwt
  * signup route
  * authenticate method
  * login route
  * findByToken method
  * ensureAuth middleware (cookie-parser)
  * verify route

