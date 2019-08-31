Movie Application
===

The purpose of this application is to demonstrate the developers grasp on Full Stack Development 

# Setup Database
## Option 1 - Local installation of MySQL
Open MySQL client to create a database and database-specific user
```
$ mysql -u root -p
mysql> create database movie_db;
mysql> grant all privileges on movie_db.* to 'movieapp' identified by 'P@ssw0rd-1';
```
The tables will be created when the application starts.

## Option 2 - MySQL Docker Image 
Pull the docker image from [Docker Hub](https://hub.docker.com/r/mysql/mysql-server/)

Create a container by passing environment variables
```
$ docker pull mysql/mysql-server:5.7
$ docker run --name=mysql57 -e MYSQL_ROOT_PASSWORD=root123 -e MYSQL_DATABASE=movie_db -e MYSQL_USER=movieapp -e MYSQL_PASSWORD=P@ssw0rd-1 -p "3306:3306" -p "33060:33060" -d mysql/mysql-server:5.7
```
To stop the container
```
$ docker stop mysql57
```
To start the container
```
$ docker start mysql57
```
To restart the container
```
$ docker restart mysql57
```
# Setup Development Environment
## Clone this repository
```
$ git clone https://gitlab-cts.stackroute.in/Soumya.Basu/MovieCruiser.git
```

## Setup backend
Update the environment variables in `env-variables.ps1` or `env-variables.sh` depending on the operating system.

Replace `TMDB_API_KEY` with your own key. Refer below for [instructions](#themoviedb)

Open a terminal in the root directory of the project and execute the below commands
```
$ ./env-variables.ps1
$ mvn clean package
$ mvn exec:java -pl Server
```

## Setup frontend
Open a terminal in the root directory of the project and execute the below commands
```
$ npm install
$ npm start
```
Navigate to http://localhost:4200 to view the application

## Running unit tests
```
$ npm test
```
## Running e2e 
To run end to end test cases, start the backend server in test profile mode
```
$ ./env-variables.ps1
$ mvn exec:java -pl Server -Dspring.profiles.active=test
$ npm run e2e
```
## Running lint
```
$ npm run lint
```

## Deployment
To build and run the application using docker. 

Open terminal and execute the following commands
```
$ .\env-variables.ps1
$ mvn clean package
$ npm install
$ npm run build
$ docker-compose up --build -d
```
Navigate to http://localhost:8080

# TheMovieDB
## To register for an API key, follow these steps:

You need to signup to [TMDB](https://www.themoviedb.org/account/signup).

- After login, click into your account settings 
![screenshot](https://www.themoviedb.org/assets/static_cache/da34d170e2ffdb3db4a317314e64b186/images/api-create-1.png)
- Click the API menu item on the left 
![screenshot](https://www.themoviedb.org/assets/static_cache/41b35724525a13c05bb1d63fe7af7621/images/api-create-2.png)
- Click "Create" from the API page 
![screenshot](https://www.themoviedb.org/assets/static_cache/af031c5c6f6787caa956d374c1c3ce9b/images/api-create-3.png)
- Fill in the details to obtain an API key
