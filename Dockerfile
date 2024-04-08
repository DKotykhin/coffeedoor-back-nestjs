FROM node:20

# Create app directory
RUN command mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app
COPY package-lock.json /app

RUN npm install

# Bundle app source
COPY . /app

# Build the app
RUN npm run build

EXPOSE 3003
CMD [ "npm", "start" ]