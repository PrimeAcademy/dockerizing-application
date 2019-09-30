# Dockerizing an Application

The following is a brief description of Docker Containers and what they have to offer from the [getting started page](https://www.docker.com/get-started) of the [docker site](https://www.docker.com).

Building and deploying applications can be made faster with containers. Docker containers wrap up software and its dependencies into a standardized unit for software development that includes everything needed to run: code, runtime, system tools, and libraries. This guarantees that the application will always run the same and makes collaboration much simpler (see [docker's get started page](https://www.docker.com/get-started)). The containers help to ensure that all environments have the exact same setups.

Docker containers whether [Windows](https://www.docker.com/products/windows-containers) or Linux are backed by Docker tools and APIs helping to build consistent environments:

- Onboard faster and stop wasting hours trying to set up development environments, spin up new instances and make copies of production code to run locally.
- Enable polyglot development and use any language, stack or tools without worry of application conflicts.
- Eliminate environment inconsistencies and the "works on my machine" problem by packaging the application, configs and dependencies into an isolated container.
- Alleviate concern over application [security](https://www.docker.com/products/security)

[Try Docker containers](https://www.docker.com/get-started) with free, hosted lab tutorials or download and take a tutorial to start building apps.

## Dockerfile, Docker with Single Container

1. In order to setup a single docker container for your development environment you need to create a file named `Dockerfile` in the root of your project directory.

1. In order to set the base environment we use an existing image from the [Docker Hub](https://hub.docker.com) using the `FROM` setting in the `Dockerfile`.

    ```
    # Base image we are modifying from https://hub.docker.com/
    FROM node:current-alpine
    ```

1. Make a new directory and set it as the working directory for the Docker image.

    ```
    # set working directory
    RUN mkdir -p /app/client
    WORKDIR /app/client
    ```

1. Copy over the existing `package.json` to the new working directory and install the application dependencies using `npm install`.

    ```
    # install and cache app dependencies
    COPY package.json /app/client/package.json
    RUN npm install
    ```

1. After dependency installation copy over all assets to the working directory.

    ```
    COPY . /app/client
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


### Dockerfile Commands

**Build and tag the Docker image:**

`docker build --tag=[CONTAINER_NAME] .`

1. `docker build` - is the command used to build our application's Docker image
1. `--tag=[CONTAINER_NAME]` - the tag flag assigns a tag or name to the built docker image so it can be used to run the docker container based on the image
    - `[CONTAINER_NAME]` - is a placeholder and can be whatever you want to use in order to identify the Docker image
1. ` .` - is a required argument showing the location of the Dockerfile to be used for the Docker configuration

**Spin up the Docker container after the build is done:**

`docker run -p 3001:3000 [CONTAINER_NAME]`

1. The [docker run command](https://docs.docker.com/engine/reference/commandline/run/) creates a new container instance, from the image we just created, and runs it.
1. `-p 3001:3000` exposes port 3000 to other Docker containers on the same network (for inter-container communication) and port 3001 to the host.
1. Additionally the `-d` option can be used in order to run the container in detach mode.


### Docker Command Cheat Sheet

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
