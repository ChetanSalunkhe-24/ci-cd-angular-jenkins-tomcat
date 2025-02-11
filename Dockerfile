# Stage 1: Build the Angular application
FROM node:18 as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build -- --configuration=production
RUN echo "Files in /app/dist/demo/browser:" && ls -la /app/dist/demo/browser

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
COPY --from=build /app/dist/demo/browser/. /app/dist/demo/
# print
RUN echo "Files in /app/dist/demo/:" && ls -la /app/dist/demo
COPY --from=build /app/dist/demo/. /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
