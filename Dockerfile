FROM node:18-alpine as builder

WORKDIR /app

COPY ./package*.json ./
RUN npm ci

COPY ./tsconfig.json ./
COPY ./src ./src
RUN npm run generate-types

RUN npm run build


FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --production

COPY --from=builder /app/build ./build/
COPY ./src/prisma ./build/prisma/
COPY --from=builder /app/src/prisma/client ./build/prisma/client

CMD npm run db:migrate -- --schema=./build/prisma/schema.prisma && npm run start
