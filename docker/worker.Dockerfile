FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock file and package.json
COPY package.json package-lock.json ./

# Copy all source code first
COPY . .

# Install dependencies using npm
RUN npm install

# Build worker
RUN ./node_modules/.bin/tsc --project apps/worker/tsconfig.json

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/apps/worker/package.json ./apps/worker/
COPY --from=builder /app/apps/worker/dist ./apps/worker/dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "apps/worker/dist/index.js"]
