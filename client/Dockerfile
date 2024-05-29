# 1st stage: build the application
FROM node:18-alpine AS BUILD_IMAGE

# set the working directory inside the container
WORKDIR /app

# copy package.json and package-lock.json 
COPY package.json .
COPY package-lock.json ./

# install dependencies
RUN npm install --force

# copy the rest of application code
COPY . .

# build the application
RUN npm run build

# # 2nd stage: run unit tests
# FROM node:18-alpine AS TEST_IMAGE

# # set the working directory inside the container
# WORKDIR /app

# # copy package.json and package-lock.json 
# COPY package.json .
# COPY package-lock.json ./

# # install only dev dependencies needed for testing
# RUN npm install --only=dev

# # copy the test scripts and configurations
# COPY jest.config.cjs .
# COPY tests ./tests

# # run unit tests
# RUN npm run test

# 3rd stage: serve the application
FROM node:18-alpine AS PRODUCTION_IMAGE

# set the working directory inside the container
WORKDIR /app

# copy the build artifacts from the build image
COPY --from=BUILD_IMAGE /app/dist ./dist

# copy package.json and package-lock.json 
COPY package.json .
COPY package-lock.json .

# Copy the Vite configuration if needed
COPY vite.config.js .

# Expose port 8080
EXPOSE 8080

# Command to run the application
CMD ["npm", "run", "preview"]
