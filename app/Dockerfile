FROM buildkite/puppeteer:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
ENTRYPOINT ["npm", "start", "Simpsons", "2"]
