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