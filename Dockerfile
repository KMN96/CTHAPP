# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the project files to the working directory
COPY . .

# Build the Next.js application
RUN npm run dev

# Expose port 3000
EXPOSE 3000

# Start the Next.js application
CMD [ "npm", "start" ]
