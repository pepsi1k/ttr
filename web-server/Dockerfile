FROM node

# create app directory
WORKDIR /usr/src/app

# copy package.json & package-lock.json
COPY package*.json ./

# install dependendencies
RUN npm install

COPY . .

# open port
EXPOSE 80

CMD ["node", "./app.js"]
