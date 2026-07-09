FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock file and package.json
COPY package.json package-lock.json ./

# Copy all source code first
COPY . .

# Install dependencies using npm
RUN npm install

# Build frontend - Run tsc and vite from within the apps/frontend directory
RUN ./node_modules/.bin/tsc -b apps/frontend/tsconfig.json && \
    cd apps/frontend && \
    ../../node_modules/.bin/vite build

FROM nginx:alpine

# Copy built artifacts
COPY --from=builder /app/apps/frontend/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

