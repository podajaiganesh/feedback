# Stage 1: Build the React/Vite application
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build 

# Stage 2: Serve the application using Nginx
FROM nginx:alpine
# Copy the built files from the builder stage (/app/dist) 
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80