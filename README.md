# Dockerizing an Application

The following is a brief description of Docker Containers and what they have to offer based on the [getting started page](https://www.docker.com/get-started) of the [docker site](https://www.docker.com).

Building and deploying applications can be made faster with containers. Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything needed to run: code, runtime, system tools, and libraries. This guarantees that the application will always run the same and makes collaboration much simpler (see [docker's get started page](https://www.docker.com/get-started)). The containers help to ensure that all environments have the exact same setups.

Docker containers whether [Windows](https://www.docker.com/products/windows-containers) or Linux are backed by Docker tools and APIs helping to build consistent environments:

- Onboard faster and stop wasting hours trying to set up development environments, spin up new instances and make copies of production code to run locally.
- Enable polyglot development and use any language, stack or tools without worry of application conflicts.
- Eliminate environment inconsistencies and the "works on my machine" problem by packaging the application, configs and dependencies into an isolated container.
- Alleviate concern over application [security](https://www.docker.com/products/security)

[Try Docker containers](https://www.docker.com/get-started) with free, hosted lab tutorials or download and take a tutorial to start building apps.


## Branching Strategy

Every section of the lesson has a corresponding branch. The branches are listed in the notes for that particular section but as an overview I have listed out the branches below.

* `master` - final `README.md` documentation for the lesson but does not have the full demo application
* `develop` - has the final version of the application along with the docker setup
* `feature-dockerfile` - [Single Docker Container](/#Single-Docker-Container) for the beginning of the lesson
* `feature-docker-compose` - [Adding Docker Compose](/#Adding-Docker-Compose) in order to setup the idea of what Docker Compose is because it's needed in order to setup multiple containers
* `feature-docker-compose-db` - [Database Container](/#Database-Container) setup within Docker Compose
* `feature-docker-compose-server` - [Server Container](/#Server-Container) setup within Docker Compose
* `feature-base-app` - base application with need of only one container for client-side
* `feature-server-app` - full stack application with DB Schema, Server, and Client-Side


## Introducing the Issue

We have a simple Client Side / Front-End Application that we want to maintain across different teammates and different environments. Typically we would be asking our team to run:
    - `npm install`
    - `npm start`
After that we would expect that they should be able to run and develop for the application locally. Seems pretty straight forward at first glance but...

1. What if someone on the team is on Windows and not Mac?
1. What if someone on the team has an older version of Node.js loaded that isn't compatible with our application?
1. What if someone on the team doesn't even have Node.js installed?
1. Now what happens if we start adding a Server API and Database Schema to be setup for our application? Our issues have just been compounded.

Luckily **Docker** can help us to solve these issue by handling environment setup, dependency loading, and launching of our application all in one place. Best of all regardless of who is using it the environment will run consistently for any team member working on the project.


## Lesson Stages

- [Installing Docker](/#Installing-Docker)
- [Single Docker Container](/#Single-Docker-Container)
- [Adding Docker Compose](/#Adding-Docker-Compose)
- [Running Multiple Containers](/#Running-Multiple-Containers)
    - [Database Container](/#Database-Container)
    - [Server Container](/#Server-Container)
    - [Client Container](/#Client-Container)


## Installing Docker

We navigate to Docker's [Get Started](https://www.docker.com/get-started) page in order to start downloading Docker. Please see the [DOCKER_INSTALLATION.md](/DOCKER_INSTALLATION.md) file for a step by step installation for Docker.


## Single Docker Container

We're gonna start by looking at how we setup a single **Docker Container**. This single **Container** will be used to launch and run a React application built using `create-react-app` as the base setup.


### Dockerfile, Docker with Single Container

1. In order to setup a single docker container for your development environment you need to create a file named `Dockerfile` in the root of your project directory.

1. In order to set the base environment we use an existing image from the [Docker Hub](https://hub.docker.com) using the `FROM` setting in the `Dockerfile`.

    ```
    # Base image we are modifying from https://hub.docker.com/
    FROM node:current-alpine
    ```

1. Make a new directory and set it as the working directory for the Docker image.

    ```
    # set working directory
    RUN mkdir -p /app
    WORKDIR /app
    ```

1. Copy over the existing `package.json` to the new working directory and install the application dependencies using `npm install`.

    ```
    # install and cache app dependencies
    COPY package.json /app/package.json
    RUN npm install
    ```

1. After dependency installation copy over all assets to the working directory.

    ```
    COPY . /app
    ```

1. Ensure that the default `create-react-app` port is exposed to the network created by Docker.

    ```
    # Exposing a specific PORT for viewing the application
    EXPOSE 3000
    ```

1. Define the final command(s) that need to be run to kick off the application when the container launches.

    ```
    # Run final command to kick off client build
    CMD ["npm", "start"]
    ```


#### Dockerfile Commands

That's great we have a configuration for **Docker** but how do we actually use it. Because we downloaded the **Docker** desktop application we now have access to the command line tools which we'll be leveraging to build our **Docker Image** and then run the **Docker Container**.

**Build and Tag the Docker Image:**

`docker build --tag=[CONTAINER_NAME] .`

1. `docker build` - is the command used to build our application's Docker image
1. `--tag=[CONTAINER_NAME]` - the tag flag assigns a tag or name to the built docker image so it can be used to run the docker container based on the image
    - `[CONTAINER_NAME]` - is a placeholder and can be whatever you want to use in order to identify the Docker image
1. ` .` - is a required argument showing the location of the Dockerfile to be used for the Docker configuration

**Running the Docker Container:**

`docker run -p 3001:3000 [CONTAINER_NAME]`

1. The [docker run command](https://docs.docker.com/engine/reference/commandline/run/) creates a new container instance, from the image we just created, and runs it.
1. `-p 3001:3000` exposes port 3000 to other Docker containers on the same network (for inter-container communication) and port 3001 to the host.
1. Additionally the `-d` option can be used in order to run the container in detach mode.

**Warm Reloading with `create-react-app`:**

Our application was built using `create-react-app` which does support web page reloading. 

To make this work, we need to do two things:
1. Mount the current working directory into the Docker container
    - `-v $(pwd):/app`, will be added to our `docker run` command
1. Expose the WebSocket port
    - The WebSocket thing is set up by exposing port 35729 to the host (`-p 35729:35729`).
    - Add `EXPOSE 35729` to our `Dockerfile` just below the other exposed port.
    - `-p 35729:35729`, will then also be added to our `docker run` command

When we run our container the command should now be:

`docker run -p 3001:3000 -p 35729:35729 -v $(pwd):/app [CONTAINER_NAME]`


## Adding Docker Compose

We had to add a lot of additional settings to the **Docker** commands but we can repurpose them as configuration settings in a new **Docker** yaml configuration file. This configuration file can hold many of these custom settings along with eventually letting us run and configure many different **Docker Containers**.

1. Create a new file called `docker-compose.yml` at the root of the project.
1. The configuration settings in the `docker-compose.yml` file are as follows:

    ```yml
    version: '3'

    services:
        ##
        ## CONTAINER for Client Side Application
        ## to test service run:
        ##     docker-compose up --build -d client
        ## ----------------------------------------
        client:
            build: 
                context: ./
            ports:
                - 3001:3000 # expose ports - HOST:CONTAINER (for create-react-app)
                - 35729:35729 # expose ports - HOST:CONTAINER (for serviceworker warm reloading)
            volumes:
                - '.:/app'
                - '/app/node_modules'
            command: npm start
    ```

**Let's breakdown what the Yaml configuration settings are.**

1. `version` - sets the version of the Docker Compose Yaml file we are working with
1. `services` - the names written as children of this define the different containers that we want to create like our `client` container
1. For the individual `client` container:
    - `build` - allows us to set custom build settings for this particular container
        - `context` - sets the build context and if `dockerfile` is not set to a specific file it will look for a `Dockerfile` existing in the root of the directory defined in the context
    - `ports` - here we define the various ports that we want exposed from our container to our host
        - `HOST:CONTAINER` - the `HOST` port is the port that will be available on your computer @ `http://localhost:HOST` and `CONTAINER` represents that port that is being exposed inside the **Docker Container**
        - this setting replaces the `-p 3001:3000 -p 35729:35729` options that were added to the `docker run` command we used previously
    - `volumes` - mounts host paths or named volumes, specified as sub-options to a service.
        - this setting replaces the `-v $(pwd):/app` option that were added to the `docker run` command we used previously
    - `command` - this should be the run command needed to start the application and it will override the `CMD` set in the `Dockerfile`


### Docker Compose Commands

[Docker Compose Commands](https://docs.docker.com/compose/reference/)

1. In order to standup our new setup run: `docker-compose up`
    - Builds, (re)creates, starts, and attaches to containers for a service. Unless they are already running, this command also starts any linked services.
    - Running `docker-compose up -d` starts the containers in the background and leaves them running.
1. In order to view the containers run: `docker-compose images`
    - List images used by the created containers.


### Running Multiple Containers

The biggest benefit to using the `docker-compose.yml` is that we can now run multiple containers from the one **Docker Image** allowing us to spin up an entire full stack application. Where as before we had to run `create db`, several SQL queries, `npm instal`, `npm run server`, & `npm run client` in order to spin up our application and develop locally with **Docker Compose** we just run `docker-compose up` and it's all taken care of.


#### Database Container

1. create a `database` directory in the root of the project folder
1. create an `init.sql` file inside of the `database` directory
    - this file will contain all of our queries for our database tables
1. create a `data.sql` file inside of the `database` directory
    - this file will be used to seed some initial data into our tables for local development

Before we used these types of files to make it easier for other people setup the local environment for our application but now we can use it to actually setup and run our database. Now let's configure **Docker Compose** with a new container to handle our database.

1. add a new container to the `docker-compose.yml` file for the database:

    ```yml
    services:
        ## ... client container settings

        ##
        ## CONTAINER for Postgres database
        ## database access URL:
        ##     postgres://POSTGRES_USER:POSTGRES_PASSWORD@localhost:HOST_PORT/POSTGRES_DB
        ## to test service run:
        ##     docker-compose up --build -d database
        ## ----------------------------------------
        database:
            image: postgres:latest
            restart: always
            ports:
                - 54320:5432
            environment:
                POSTGRES_USER: dockerpguser
                POSTGRES_PASSWORD: linkAwake342
                POSTGRES_DB: employee_portal
                POSTGRES_HOST: localhost
            volumes:
                - ./database/init.sql:/docker-entrypoint-initdb.d/10-init.sql
                - ./database/data.sql:/docker-entrypoint-initdb.d/20-data.sql
    ```

1. Let's breakdown what these settings are doing
    - `database` - defines the name for the new container
    - `image` - inside of the `Dockerfile` we used for the `client` container we defined a base image using `FROM` this is the `docker-compose.yml` equivalent of that so in this case our base image is `postgres:latest`
    - `restart` - we are telling to always restart the database when inactive
    - `ports` - we are exposing the Docker container postgres port that is be default `5432` to our **HOST** machine on port `54320` so as not to conflict with any other postgres database we may have running (`HOST:CONTAINER`)
    - `environment` - just like you have seen us set up environment variables on a `.env` file locally we can set some environment configuration variables for the **Docker Container**, the majority of the environment configurations are things that our base image leverages in order to spin up postgres
        - `POSTGRES_USER` - this is the database username used to access the database
        - `POSTGRES_PASSWORD` - this is the password associated with the provided username
        - `POSTGRES_DB` - this is the name of the postgres database
        - `POSTGRES_HOST` - this is the base host location `localhost` where Postico will access the database
    - `volumes` - we have seen this use in out `client` container but the way in which we are using it here is very different because it's actually running our SQL files for us in order to setup our tables/schema and seed some data inside of there
        - `[PATH_TO_SQL]:/docker-entrypoint-initdb.d/[SQL_FILE_NAME].sql` - in the first part you should put the path to the `.sql` file in your codebase relative to the `docker-compose.yml` file and in the second part you are going to use a very specific naming structure to rename the file that you are pointing to in your project directory where you start with a number `10-` and then use the same name as your origin file for the second part `init.spl`
            - The numbers being used are the key here because that helps us to run the SQL files in a specific order

Now that we have our configurations setup let's go ahead and build out our new environment with both the client and database running. We'll want to make sure to first remove any previous **Docker Images** we may have had running and then spin up our new **Docker Containers**.

1. run: `docker-compose images`
1. may see some images that have been created listed out in the console

    ```
           Container                Repository         Tag       Image Id      Size 
    --------------------------------------------------------------------------------
    dockerize-app_client_1     dockerize-app_client   latest   ca3551b22fa3   407 MB
    ```

1. run: `docker-compose stop`
    - ensures that all the images have stopped 
1. run: `docker-compose rm`
    - removes all of the stopped images and you can verify by running `docker-compose images` again
1. run: `docker-compose up`
    - this will load and build all of our images and then run our containers
1. Make sure that our `client` environment is still working by navigating to **http://localhost:3001** in your browser.
1. Now we can take a look at the database using **Postico** because we have exposed those ports.
1. Open **Postico** and make sure you are looking at your favorites window.
1. Click **Edit** on one of your favorites or add a **New Favorite**
1. **Nickname** - call it "Docker"
1. **Host** - use "localhost" (same value we used for `POSTGRES_HOST`)
1. **User** - use "dockerpguser" (same value used for `POSTGRES_USER`)
1. **Password** - use "linkAwake342" (same the value used for `POSTGRES_PASSWORD`)
1. **Database** - use "employee_portal" (same the value used for `POSTGRES_DB`)
1. Click **Connect** and then Postico will open up a view of the database and you'll se that not only did it create our **"employees"** table for us but it also populated some initial data for us as well based on the queries in our SQL files


#### Server Container

Now that we have the `client` environment and `database` setup and working in our `docker-compose.yml` let's take a look at setting up the server.


##### Creating Dockerfile for the Server

1. Take a look at the `/server` directory. Inside there is a separate `package.json` file that will manage only the dependencies and run scripts for the server.
1. In the `/server` directory create a `Dockerfile` with the following settings:

    ```Dockerfile
    # Base image we are modifying from https://hub.docker.com/
    FROM node:12-alpine

    # Creating App Directory
    RUN mkdir -p /app/server
    WORKDIR /app/server

    COPY package.json /app/server

    RUN npm install

    COPY . /app/server

    # Run final command to kick off server
    CMD ["npm", "run", "server"]
    ```

1. This should look very familiar because it is nearly an identical setup to what we had for the client container's Dockerfile. The major differences is that the `WORKDIR` has a different path and that the `CMD` to run the server is different.
1. add a new container to the `docker-compose.yml` file named **server**:

    ```yml
        ##
        ## CONTAINER for Server Application
        ## to test service run:
        ##     docker-compose up --build -d server
        ## ----------------------------------------
        server:
            build: 
                context: ./server
            ports:
                - 5000:5000 # expose ports - HOST:CONTAINER
            environment:
                PORT_DB: 5432
                POSTGRES_USER: dockerpguser
                POSTGRES_PASSWORD: linkAwake342
                POSTGRES_DB: employee_portal
                POSTGRES_HOST: database
            volumes:
                - './server:/app/server'
                - '/app/server/node_modules'
            depends_on:
                - database
            command: npm run server
    ```

1. Let's breakdown what these settings are doing.
    - `server:` - is defining the the HOST name for the server container
    - `build:` - allows us to set custom build settings for this particular container
        - `context:` - sets the build context and if `dockerfile` is not set to a specific file it will look for a `Dockerfile` existing in the root of the directory defined in the context
    - `ports:` - here we define the ports that we want exposed from our container to our host machine
        - `HOST:CONTAINER` - the `HOST` port is the port that will be available on your computer @ `http://localhost:HOST` and `CONTAINER` represents that port that is being exposed inside the **Docker Container**
    - `environment:` - sets environment variables that will be accessible via `process.env` in our server code in order to establish the connection with the **database** container
        - `PORT_DB: 5432` - setting the value for the database port to be used in the `pool` configuration
        - `POSTGRES_USER: dockerpguser` - setting the value for the database user for login to be used in the `pool` configuration
        - `POSTGRES_PASSWORD: linkAwake342` - setting the value for the database password for login to be used in the `pool` configuration
        - `POSTGRES_DB: employee_portal` - setting the value for the database name to be used in the `pool` configuration
        - `POSTGRES_HOST: database` - sets the value for the database host allowing interconnectivity between the **database** container and the **server** container which is the namespace we have given to our **database** container
    - `volumes:` - mounts host paths or named volumes, specified as sub-options to a service.
    - `depends_on:` - used to define any of the other **docker containers** that the **server** container depends on, identifying a connection for **docker-compose**
    - `command` - the run command needed to kick off the server application and it will override the `CMD` set in `/server/Dockerfile`


##### Setting up the Database Connection

1. Our server normally establishes our database connection using `pg` which we configure in our `/server/modules/pool.js` file and we are going to need to make sure our pool is configured correctly
1. Let's see what the updates to `pool.js` look like

    ```JS
    const pg = require('pg');
    const url = require('url');

    let config = {};

    if (process.env.DATABASE_URL) {
        // Heroku gives a url, not a connection object
        // https://github.com/brianc/node-pg-pool
        const params = url.parse(process.env.DATABASE_URL);
        const auth = params.auth.split(':');

        config = {
            user: auth[0],
            password: auth[1],
            host: params.hostname,
            port: params.port,
            database: params.pathname.split('/')[1],
            ssl: true, // heroku requires ssl to be true
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
        };
    } else {
        config = {
            host: process.env.POSTGRES_HOST ? process.env.POSTGRES_HOST : 'localhost', // Server hosting the postgres database
            user: process.env.POSTGRES_USER ? process.env.POSTGRES_USER : 'postgres',
            password: process.env.POSTGRES_PASSWORD ? process.env.POSTGRES_PASSWORD : 'postgres',
            port: process.env.PORT_DB ? process.env.PORT_DB : 5432, // env var: PGPORT
            database: process.env.POSTGRES_DB ? process.env.POSTGRES_DB : 'prime_db', // env var: PGDATABASE
            max: 10, // max number of clients in the pool
            idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
        };
    }

    // this creates the pool that will be shared by all other modules
    const pool = new pg.Pool(config);

    // the pool with emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    pool.on('error', (err) => {
        console.log('Unexpected error on idle client', err);
        process.exit(-1);
    });

    module.exports = pool;
    ```

1. Everything looks fairly similar to our normal setup except for some additions to the config setup in the `} else {` where we are leveraging the environment variables that we configured in the `docker-compose.yml` file for the **server** container
1. We have checks in place for to ensure that the environment variables are in place using ternary operators. The environment variables we're looking for are as follows:
    - process.env.POSTGRES_HOST (for the **host** config setting)
    - process.env.POSTGRES_USER (for the **user** config setting)
    - process.env.POSTGRES_PASSWORD (for the **password** config setting)
    - process.env.PORT_DB (for the **port** config setting)
    - process.env.POSTGRES_DB (for the **database** config setting)
1. Now our **server** container will be able to communicate with the **database** container as needed


##### Testing Server Container

1. run: `docker-compose stop`
    - ensures that all the images have stopped 
1. run: `docker-compose rm`
    - removes all of the stopped images and you can verify by running `docker-compose images` again
1. run: `docker-compose up --build`
    - this will load and build all of our images and then run our containers, with the `--build` in place it forces **Docker** to run the build for the images again
1. In **Postman** you should be able to test the Fruit Stand route by setting it to **GET** and then using the route `http://localhost:5000/api/fruits`
    - should get a list back with four fruits to be put out on the fruit stand
1. To test Employee data which will confirm that our **server** container is connecting to our **database** container we can test the **GET** rout of `http://localhost:5000/api/emplopyees` in **Postman**
    - this endpoint reaches out to the database and returns a full list of the employees


#### Client Container

With the database and the server container hooked up we'll need to make some adjustments to the client-side code in order to get it's container to work with the database and server containers.

1. Create a new `client` directory at the root of the project
1. Move the following files/folders into the new client directory:
    - `./Dockerfile`
    - `./src`
    - `./public`
    - `package.json` (this file we'll copy and paste the copy into `./client`)
1. Let's take a look at the changes we need to make to `./client/Dockerfile` first

    ```
    # Base image we are modifying from https://hub.docker.com/
    FROM node:12-alpine

    # set working directory
    RUN mkdir -p /app/client
    WORKDIR /app/client

    # install and cache app dependencies
    COPY package.json /app/client/package.json
    RUN npm install

    COPY . /app/client

    # Exposing a specific PORT for viewing the application
    EXPOSE 3000
    EXPOSE 35729

    # Run final command to kick off client build
    CMD ["npm", "run", "client"]
    ```

    > Note: All of the `WORKDIR` paths that were previously referenced as `/app` are now `/app/client` to match the same format we are using for the **server** container

1. Another change that was made was to update the `./package.json` proxy to have the correct host to connect with the server

    ```JSON
    {
        "name": "dockerize-app-ui",
        "version": "0.1.0",
        "private": true,
        "proxy": "http://server:5000",
        "dependencies": {
            "@material-ui/core": "^4.4.3",
            "axios": "^0.19.0",
            "react": "^16.10.1",
            "react-dom": "^16.10.1",
    ```

    > Note: like the database host defined for the **server** container the host for our `proxy` is no longer `http://localhost:5000` but is now using the name of our `docker-compose.yml` **server** service as the host, `http://server:5000`

1. Finally we are going to look at the adjustments needed for the `docker-compose.yml`

    ```YAML
        ##
        ## CONTAINER for Client Side Application
        ## to test service run:
        ##     docker-compose up --build -d client
        ## ----------------------------------------
        client:
            build: 
                context: ./client
            ports:
                - 3000:3000 # expose ports - HOST:CONTAINER (for create-react-app)
                - 35729:35729 # expose ports - HOST:CONTAINER (for serviceworker warm reloading)
            volumes:
                - './client:/app/client'
                - '/app/client/node_modules'
            depends_on:
                - server
            command: npm run client
    ```

    - `context:` - adjusted to reflect the new location of the `Dockerfile`
    - `volumes:` - paths have been updated to match the new `WORKDIR` path
    - `depends_on:` - telling docker that the `client` service depends on the `server` service

1. With the final container in place we should be able to test the full stack application

#### Testing Full Stack Application

All of the commands listed after "run:" are assumed to be run from the command line in the project directory.

1. run: `docker-compose up` 
    - if you were running `docker-compose up` to test the different branches then you will want to make sure to remove the previous images by running the following in sequence
        - `docker-compose stop`, makes sure that all docker images are stopped
        - `docker-compose rm`, removes all stopped docker images
        - `docker-compose up --build`, builds and runs docker images and containers (`--build` ensures that the build runs regardless of the state of the image)
1. In the browser navigate to `http://localhost:3000` you should see the client application running
1. If you go to `http://localhost:3000/#/tool-box` you should see the Fruit Stand and Employee section running fully.
    - Fruit Stand is using the server without database connection
    - Employee is using the server with database connection
1. With Docker still running try changing a heading on the **Tool Box** page to make sure that the browser content is getting refreshed
1. Now test to see if the server watch is working correctly by changing something in the `/api/fruits` API route and then refresh the **Tool Box** page in the browser
1. From the command line you can press **control + C** keys to stop running docker witch should also stop the docker images


#### Docker Command Cheat Sheet

```
## List Docker CLI commands
docker
docker container --help

## Display Docker version and info
docker --version
docker version
docker info

## Execute Docker image
docker run hello-world

## List Docker images
docker image ls

## List Docker containers (running, all, all in quiet mode)
docker container ls
docker container ls --all
docker container ls -aq

## Remove image by ID
docker image rm [ID]
## Remove all stopped images
docker image prune

## Remove all stopped containers:
## pass the `--volumes` tag if you want all volumes to be removed as well
docker system prune

## Remove container by ID:
docker container rm [ID]

```

## Dependencies

- [Create React App](https://github.com/facebook/create-react-app)
- react
- redux
- redux saga
- node.js
- express
- postgresql
