# Stage 1: Build
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev

# Stage 2: Node server. Static pages and assets come from dist/client; the
# pages that read the CMS render per request, so no CMS_API_URL is baked in.
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=80 \
    CMS_API_URL=https://excellenceplus.id/admin-api
COPY package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD wget -qO- http://127.0.0.1:80/about-us >/dev/null || exit 1
CMD ["node", "dist/server/entry.mjs"]
