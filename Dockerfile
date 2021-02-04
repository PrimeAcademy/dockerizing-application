# Base image we are modifying from https://hub.docker.com/
FROM node:14.15.4-alpine3.10

# set working directory
RUN mkdir -p /app
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install

COPY . /app

# Exposing a specific PORT for viewing the application
EXPOSE 3000
EXPOSE 35729

# Run final command to kick off client build
CMD ["npm", "start"]
