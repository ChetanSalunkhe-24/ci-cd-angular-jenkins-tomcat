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

# Correctly reference the Angular build output
COPY --from=builder /app/dist/demo .

# Copy a custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80 for web traffic
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
