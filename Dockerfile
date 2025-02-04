# 1️⃣ Use Node.js to build the Angular app
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (use legacy-peer-deps to avoid version issues)
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the Angular app
RUN npm run build --configuration=production

# 2️⃣ Use Nginx to serve the built Angular app
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Start from NGINX to serve the built application
FROM nginx:alpine
EXPOSE 8080
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
