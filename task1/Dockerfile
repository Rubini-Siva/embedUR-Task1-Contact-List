# Use Node.js image to build the React app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application source code
COPY . .  

# Build the React app for production
RUN npm run build

# Use Nginx to serve the built app
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 for the React app
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]