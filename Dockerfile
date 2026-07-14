# syntax=docker/dockerfile:1

FROM node:lts-bookworm AS builder

WORKDIR /src

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


FROM node:lts-bookworm

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# Dùng chung một đường dẫn ở cả lúc cài và runtime
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV BROWSER_DISABLE_GPU=true
ENV BROWSER=chromium
ENV BROWSER_HEADLESS=true

# Cài thư viện Linux và đúng Chromium của rebrowser-playwright-core
RUN node node_modules/rebrowser-playwright-core/cli.js install-deps chromium \
    && node node_modules/rebrowser-playwright-core/cli.js install chromium \
    && node -e "const { chromium } = require('rebrowser-playwright-core'); const fs = require('fs'); const p = chromium.executablePath(); if (!fs.existsSync(p)) throw new Error('Missing Chromium: ' + p); console.log('Chromium ready:', p)"

COPY --from=builder /src/.next ./.next

EXPOSE 10000

CMD ["npm", "run", "start"]
