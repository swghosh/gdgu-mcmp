FROM node:carbon
# create application directory
WORKDIR /usr/src/app
# install app dependencies
COPY package*.json ./
# bundle app source
COPY . .
# run the web app 
CMD ["npm", "start"]
