FROM node:20-alpine AS builder

WORKDIR /app

# Copy lock file and package.json
COPY package.json package-lock.json ./

# Copy all source code first
COPY . .

# Install dependencies using npm
RUN npm install

# Build worker
RUN ./node_modules/.bin/tsc --project packages/worker/tsconfig.json

FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy necessary files
COPY --from=builder /app/packages/worker/package.json ./packages/worker/
COPY --from=builder /app/packages/worker/dist ./packages/worker/dist
COPY --from=builder /app/node_modules ./node_modules

CMD ["node", "packages/worker/dist/src/index.js"]
