FROM node:6

# Install app dependencies
COPY package.json /src/package.json
RUN cd /src; npm install --production

# Bundle app source
COPY . /src

ENV PORT=1337
EXPOSE 1337

WORKDIR /src
CMD ["npm", "start"]
