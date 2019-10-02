# Dockerizing an Application

The following is a brief description of Docker Containers and what they have to offer based on the [getting started page](https://www.docker.com/get-started) of the [docker site](https://www.docker.com).

Building and deploying applications can be made faster with containers. Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything needed to run: code, runtime, system tools, and libraries. This guarantees that the application will always run the same and makes collaboration much simpler (see [docker's get started page](https://www.docker.com/get-started)). The containers help to ensure that all environments have the exact same setups.

Docker containers whether [Windows](https://www.docker.com/products/windows-containers) or Linux are backed by Docker tools and APIs helping to build consistent environments:

- Onboard faster and stop wasting hours trying to set up development environments, spin up new instances and make copies of production code to run locally.
- Enable polyglot development and use any language, stack or tools without worry of application conflicts.
- Eliminate environment inconsistencies and the "works on my machine" problem by packaging the application, configs and dependencies into an isolated container.
- Alleviate concern over application [security](https://www.docker.com/products/security)

[Try Docker containers](https://www.docker.com/get-started) with free, hosted lab tutorials or download and take a tutorial to start building apps.


## Introducing the Issue

We have a simple Client Side / Front-End Application that we want to maintain across different teammates and different environments. Typically we would be asking our team to run:
    - `npm install`
    - `npm start`
After that we would expect that they should be able to run and develop for the application locally. Seems pretty straight forward at first glance but...

1. What if someone on the team is on Windows and not Mac?
1. What if someone on the team has an older version of Node.js loaded that isn't compatible with our application?
1. What if someone on the team doesn't even have Node.js installed?

Luckily **Docker** can help us to solve these issue by handling environment setup, dependency loading, and launching of our application all in one place. Best of all regardless of who is using it the environment will run consistently for any team member working on the project.


## Installing Docker

1. Navigate to the [Docker Get Started](https://www.docker.com/get-started) page.
1. Click on the **Download Desktop and Take a Tutorial** button on the right side of the page.
1. Create an account with Docker Hub.
    - The Docker ID is the username that docker will use to identify you.
    - Complete Profile...
    - Confirmation email...
1. Downloading the Docker desktop application in the BG.


## Lesson Stages

- [Single Docker Container](/#Single-Docker-Container)
- [Adding Docker Compose](/#Adding-Docker-Compose)
- [Running Multiple Containers](/#Running-Multiple-Containers)
    - [Database Container](/#Database-Container)
    - [Server Container](/#Server-Container)


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
            environment:
                - REACT_APP_PORT=3000
                # - CHOKIDAR_USEPOLLING=true # supposed to help with watch events in VM https://create-react-app.dev/docs/advanced-configuration
            ports:
                - 3001:3000 # expose ports - HOST:CONTAINER
                - 35729:35729
            volumes:
                - '.:/app'
                - '/app/node_modules'
            command: npm run client
    ```

1. Breaking down the configuration



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
