# ACL# Online Learning Platform

## Table of Contents
- [Project Description](#project-description)
- [Tools and Frameworks](#tools-and-frameworks)
- [Coding Style](#coding-style)
- [Installation](#installation)
- [Features](#features)
  * [Admin Functionalities](#administrator)
  * [User/Guest Functionalities](#guest)
- [Testing](#testing)
- [API References](#api-references)
- [Code Example](#code-example)
- [Credits](#credits)


## Project Description

### Course 
Advanced Computer Lab (CSEN 704/ DMET 706), Winter 2022

### Motivation
The theme of the project, is to create a complete Online learning platform. a learning platform is a web application through which Instructors can provide their courses online and individuals can join these courses.
Such websites include Coursera.com, Udacity.com, and Udemy.com

### Overview 
This project followed the Agile Methodology; meaning it was splited into Sprints, with
each Sprint lasting a set amount of time and a fully functioning version of the project
with the specified System Requirements should be submitted and evaluated.

### Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop
the software.
- Learn the process of following a given set of System Requirements to develop a
software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub and to handle conflicts. :sweat_smile:


## Tools and Frameworks
![MERN_STACK](https://www.sbr-technologies.com/wp-content/uploads/2021/07/Mern-Stack-Developer.png)

### What is the MERN Stack?
MERN stands for MongoDB, Express, React, Node, after the four key technologies that make up the stack.

- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server

Express and Node make up the middle (application) tier. Express.js is a server-side web framework, and Node.js the popular and powerful JavaScript server platform. Regardless of which variant you choose, ME(RVA)N is the ideal approach to working with JavaScript and JSON, all the way through.

### How does the MERN stack work?
The MERN architecture allows you to easily construct a 3-tier architecture (frontend, backend, database) entirely using JavaScript and JSON.

![MERN_ARCH](https://webimages.mongodb.com/_com_assets/cms/mern-stack-b9q1kbudz0.png?auto=format%2Ccompress)

#### - React.js Front End
The top tier of the MERN stack is React.js, the declarative JavaScript framework for creating dynamic client-side applications in HTML. React lets you build up complex interfaces through simple Components, connect them to data on your backend server, and render them as HTML.

React’s strong suit is handling stateful, data-driven interfaces with minimal code and minimal pain, and it has all the bells and whistles you’d expect from a modern web framework: great support for forms, error handling, events, lists, and more.

#### - Express.js and Node.js Server Tier
The next level down is the Express.js server-side framework, running inside a Node.js server. Express.js bills itself as a “fast, unopinionated, minimalist web framework for Node.js,” and that is indeed exactly what it is. Express.js has powerful models for URL routing (matching an incoming URL with a server function), and handling HTTP requests and responses.

By making XML HTTP Requests (XHRs) or GETs or POSTs from your React.js front-end, you can connect to Express.js functions that power your application. Those functions in turn use MongoDB’s Node.js drivers, either via callbacks for using Promises, to access and update data in your MongoDB database.

#### - MongoDB Database Tier
If your application stores any data (user profiles, content, comments, uploads, events, etc.), then you’re going to want a database that’s just as easy to work with as React, Express, and Node.

That’s where MongoDB comes in: JSON documents created in your React.js front end can be sent to the Express.js server, where they can be processed and (assuming they’re valid) stored directly in MongoDB for later retrieval. Again, if you’re building in the cloud, you’ll want to look at Atlas. If you’re looking to set up your own MERN stack, read on!

## Coding Style 
This project is divided into two main parts, frontend and backend. Our backend is divide into routes that act as a middle point between the client and the database.

## Installation
In order to run our project, you should have the following installed in your machine:
 - [Node JS](https://nodejs.org/en/)
 - [NPM](https://www.npmjs.com/)
 - [React JS](https://react-cn.github.io/react/downloads.html) or you can use `NPM`
 - [MongoDB](https://docs.mongodb.com/manual/installation/) either locally or on a cloud.
You have to create `.env` with the dbconnectionString.
- And you can choose any text editor.
     

## Features 
We have 2 main users in our website:
- Adminstrator
-  Guest can join AS 
   * Instructor
   * Individual trainee 
   * Corporate trainee
   

### Administrator
- Log in using his email and password.
- add another administrator with a set username and password.
- add instructor or corporate trainees and create their usernames and passwords.
![add](https://user-images.githubusercontent.com/72264551/210170605-b2b4e7ff-9af4-4391-ac03-adf7a90cadee.png)
- view course requests from corporate trainees.
![course request](https://user-images.githubusercontent.com/72264551/210169548-c9c9b6cf-cd16-42e9-8cd7-f68435a08828.png)
- view reports and resolve or pend it 
![reports](https://user-images.githubusercontent.com/72264551/210170658-248856e0-da70-4cb7-a70c-ec68053f4716.png)


### Guest 
- select gender and country, view and accept the website payment policy.
- can view all courses with their total hours, price and rating.
![courses](https://user-images.githubusercontent.com/72264551/210169508-9be74393-d5fd-4285-87c9-3597d50264a6.png)
- can filter the courses based on price, subject, or rating.
- can search for specific course based on instructor or subject and can see a preview video for this course 
![filter](https://user-images.githubusercontent.com/72264551/210169482-2e937386-6ad2-4724-81c1-9d148a4ac90e.png)
- can view the most popular courses.
 ![popular](https://user-images.githubusercontent.com/72264551/210169452-1bf3290a-a2aa-4886-95e4-936addf208c1.png)

#### As an Instructor 
-  can sign up, log in, log out, change his mail, password or biography, receive an email for changing forgetten password (Update his profile)
![update profile](https://user-images.githubusercontent.com/72264551/210169281-3e45b755-ccc0-450b-b916-9abdc460eb02.png)
-  view and accept the contract with the website 
-  Add Course with subtitles, videos and can define promotion  
![add course](https://user-images.githubusercontent.com/72264551/210169092-3d1d114b-bc61-4e55-bff2-78d049985f5a.png)
![upload](https://user-images.githubusercontent.com/72264551/210169354-37c8bca2-3de7-4ff5-b868-3c4865b88f37.png)
- view his/her rating and reviews as an instructor
![rating](https://user-images.githubusercontent.com/72264551/210169410-995fc80d-babf-43d3-b2b7-1227df1a4cd1.png)
-  Create an Exam 
![createExam](https://user-images.githubusercontent.com/72264551/210171381-d3357f82-16f7-4884-9648-fd157220d9ca.jpeg)


#### As an individual trainee /corporate trainee 
- receive an email to change a forgotten password 
![forget](https://user-images.githubusercontent.com/72264551/210171495-9b72ca67-aa2f-476a-9636-0c11ed8aa6be.jpeg)
- rate course and instructor 
![rate course](https://user-images.githubusercontent.com/72264551/210171321-f6d2af5e-142a-45a1-aed2-d45b4ca24622.png)
- solve the exam, view the correct answers and view his grade 
![solveExam](https://user-images.githubusercontent.com/72264551/210171615-3d51cfcb-edf4-401a-8b66-e6c9e4bfd2d1.jpeg)
- write notes while watching the video
![writeNotes](https://user-images.githubusercontent.com/72264551/210171658-88e162d0-7304-41f5-8fff-76be0653b9ad.jpeg)
- recieve a Certificate at the end of the course 
[certificate (3).pdf](https://github.com/Advanced-Computer-Lab-2022/Its-the-ACL-time/files/10328842/certificate.3.pdf)
- report any problem and see the previous reports 
![previous](https://user-images.githubusercontent.com/72264551/210171769-2ab4e848-2b75-4d2d-8760-f35fe06f41cd.png)
![report](https://user-images.githubusercontent.com/72264551/210171774-928a8d17-768e-4874-8f2e-291488e19df0.png)

## Testing
- Test if the instructor need to update course whether he is the owner or not 
```
const updateCourse = async (req, res) => {
  const { type, userId } = req.user;
  const { courseId } = req.params;
  const { type: updateType } = req.query;

  if (!courseId) throw new BadRequestError('Please provide course id');

  const course = await Course.findOne({ _id: courseId });

  if (!course)
    throw new BadRequestError(`There is no course with this id ${courseId}`);

  if (!updateType)
    throw new BadRequestError('Please provide update type in query params');
  else {
    const user = await User.findOne({
      _id: userId,
    });

    if (updateType === 'review') {
      const course = user.courses.find(
        (course) => course.courseId.toString() === courseId
      );

      if (!course) {
        throw new BadRequestError('You are not enrolled in this course');
      }

      course.reviewed = true;
      await user.save();
    } else {
      const isOwner =
        course.createdBy.toString() === userId ||
        user.courses.find((course) => course.courseId.toString() === courseId);

      if (!isOwner) {
        console.log('You are not the owner of that course');
        throw new UnauthorizedError('You are not the owner of that course');
      }
    }
  }
  ```
- test if user want to change password whether the old password is correct or not 
```
if (oldPassword && newPassword) {
    const isMatch = await user.comparePassword(oldPassword.toString());
    if (!isMatch) throw new UnauthorizedError('Invalid credentials');
    user.password = newPassword;
  }
  ```
## API references
- Stripe API for Payment process --> https://stripe.com/docs/api
- Googleapis --> https://googleapis.dev/nodejs/googleapis/latest/tasks/
- Nodemailer --> https://nodemailer.com/about/
- Jwt --> https://jwt.io/introduction


## Code Example 

    const user = {
      email: email.current.value,
      password: password.current.value,
      endPoint: 'login',
    };
    if (!user.email || !user.password) {
      setAlert('error', 'Please Provide all values');
      setTimeout(() => clearAlert(), 3000);
    } else {
      const status = await setup(user);
      if (status) {
        console.log('Login Success' + status);
        setTimeout(() => navigate('/'), 3000);
      }
    }
    
    
  ## Credits  
 - Traversy Media (Youtube Channel) --> https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA
 - The Net Ninja (Youtube Channel) --> https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg
 - W3schools (Online Web Tutorials) --> https://www.w3schools.com/
 
 
