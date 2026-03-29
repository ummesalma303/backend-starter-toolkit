# ---------- Build Stage ----------
FROM node:20-alpine AS builder

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build


# ---------- Runtime Stage ----------
FROM node:20-alpine

RUN corepack enable

WORKDIR /app

ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY --from=builder /app/dist ./dist

RUN mkdir -p logs

EXPOSE 3000

CMD ["pnpm", "run", "start"]