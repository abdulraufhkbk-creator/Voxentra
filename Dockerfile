# Voxentra Production Dockerfile - NTRO SIH26152
FROM node:22-alpine AS base

WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci || npm install

# Copy source
COPY . .

# Generate Prisma (may fail offline, handled)
RUN npx prisma generate --allow-no-engine || echo "Prisma generate skipped offline"

# Build
RUN npm run build

EXPOSE 3000
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["npm", "start"]
