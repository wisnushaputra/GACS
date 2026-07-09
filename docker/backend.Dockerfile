FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock file and package.json
COPY package.json package-lock.json ./

# Copy all source code first
COPY . .

# Install dependencies using npm
RUN npm install

# Build backend
RUN ./node_modules/.bin/tsc --project apps/backend/tsconfig.json

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files from builder stage
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["node", "apps/backend/dist/src/index.js"]
