FROM node:10-stretch as intermediate
COPY package.json ./
COPY package-lock.json ./
RUN npm i

FROM node:10-stretch
RUN mkdir /code
COPY . /code
WORKDIR /code
COPY --from=intermediate ./node_modules /code/node_modules

EXPOSE 8080

#CMD npm start
CMD sh docker_entrypoint.sh