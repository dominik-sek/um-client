
<h1 align="center">University Management</h3>
<a name="readme-top></a>
<div align="center">

  [![Status](https://img.shields.io/badge/status-active-success.svg)](um.dominiksek.com) 
  [![GitHub Issues](https://img.shields.io/github/issues/gothic459/um-client)](https://github.com/gothic459/um-client/issues)
  [![GitHub Pull Requests](https://img.shields.io/github/issues-pr/gothic459/um-client)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
</div>


## 📝 Table of Contents
- [About](#about)
- [Screenshots](#screenshots)
- [Getting Started](#gettig_started)
- [Built Using](#built_using)
- [Authors](#authors)
- [Contact](#contact)

## 🧐 About <a name = "about"></a>


## 💻 Screenshots<a name = "screenshots"></a>
### Student Panel
![Student Panel][student-panel]
### Teacher Panel
![Teacher Panel][teacher-panel]
### Managing Users
![Users Panel][users-panel]
### Managing Grades
![Grades Panel][grades-panel]
### Adding Grades
![Add Grade][add-grade]
### Sending Messages
![Messages][messages]
### Live Chat
![Live Chat][live-chat]


## 🏁 Getting Started <a name = "getting_started"></a>
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
In order to run this project locally, you're gonna need:

 1. node v18.15.0
 2. postgresql
 3. redis-cli

### Installing and running

clone the repo with:
```
git clone https://github.com/gothic459/um-client/ your_folder_name
```
after cloning the repo, install all the dependencies using
```
yarn
```
or
```
npm install
```
---
you will also need to create a file in the root folder called `.env` which will contain all the enviormental variables used in the project:
```
VITE_CLOUDINARY_UPLOAD_PRESET=
VITE_CLOUDINARY_UPLOAD_PRESET_DOCS=  
VITE_CLOUDINARY_CLOUD_NAME=  
VITE_API_URL=
```
---
In order to be able to upload files to the app, you're gonna need  to create a cloudinary account, following the steps in it's documentation, and filling the .env file.

If you want to run it locally on your machine, use:
```
yarn dev --host
```
which will serve the app at `http://localhost:5173`
If you want to build the project, use:
```
yarn build
```
which will output static files into the `./dist` folder.



## ⛏️ Built Using <a name = "built_using"></a>

- React.js
Vite
- TypeScript
- ChakraUI
- Zustand
- i18n


## ✍️ Authors <a name = "authors"></a>

- [@gothic459](https://github.com/gothic459)

## 📞 Contact <a name = "contact"></a>

Dominik Sęk - [@gothic459](https://github.com/gothic459) |  [email](d.sek464@gmail.com)

Project Links:
* [Client](https://github.com/gothic459/um-client)
* [Server](https://github.com/gothic459/um-server)


<p align="right">(<a href="#readme-top">back to top</a>)</p>


[add-grade]: images/add-grade.png
[grades-panel]: images/grades-panel.png
[messages]: images/messages.png
[teacher-panel]: images/teacher-panel.png
[users-panel]: images/users-panel.png
[student-panel]: images/student-panel.png
[live-chat]: images/message.gif

