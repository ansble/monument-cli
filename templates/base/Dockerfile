FROM node:6

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

EXPOSE 3000

WORKDIR /src
CMD ["npm", "start"]
