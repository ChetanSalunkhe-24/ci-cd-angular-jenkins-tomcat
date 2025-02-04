# Use an official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker caching
COPY package*.json ./

# Force npm to resolve dependency issues
RUN npm install --legacy-peer-deps

# Copy the rest of the source code
COPY . .

# Build the Angular app
RUN npm run build --prod

# Expose port (for serving the app, if needed)
FROM nginx:alpine-slim
EXPOSE 8080
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist /usr/share/nginx/html

# Keep the container running (use CMD if serving the app)
CMD ["tail", "-f", "/dev/null"]
