# The base image to start from
FROM node:18.3.0-bullseye

# Setup working directory for the app
WORKDIR /app

# Copy the package and package-lock files
COPY package*.json ./

# Install node modules
RUN npm install

# Copy the application files
COPY . .

## Launch the wait tool and then the application
CMD npm run dev