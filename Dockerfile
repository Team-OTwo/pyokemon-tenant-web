FROM node:20-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN npm i -g corepack@latest

RUN corepack enable 
RUN pnpm --version

FROM base AS builder

WORKDIR /app

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .
RUN pnpm install
RUN pnpm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]
