# Base image we are modifying from https://hub.docker.com/
FROM node:12-alpine

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# set working directory
RUN mkdir -p /app/client
WORKDIR /app/client

# install and cache app dependencies
COPY package.json /app/client/package.json
RUN npm install

COPY . /app/client

# Exposing a specific PORT for viewing the application
EXPOSE 3000

# Run final command to kick off client build
CMD ["npm", "start"]
