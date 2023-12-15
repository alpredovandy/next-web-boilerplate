# Install dependencies
FROM 038847544130.dkr.ecr.ap-southeast-3.amazonaws.com/reybuild-20:latest AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json ./
RUN yarn install --frozen-lockfile

# Rebuild the source code
FROM 038847544130.dkr.ecr.ap-southeast-3.amazonaws.com/reybuild-20:latest AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN yarn build && yarn install --production --ignore-scripts --prefer-offline

# Production image, copy all the files and run next
FROM 038847544130.dkr.ecr.ap-southeast-3.amazonaws.com/reybase-20:latest AS runner
WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
# COPY --from=builder /app/pages ./pages
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY .env ./.env
# COPY i18n.js ./i18n.js

EXPOSE 3000
ENV PORT 3000
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_OPTIONS "-r @newrelic/next"

CMD ["node_modules/.bin/next", "start"]