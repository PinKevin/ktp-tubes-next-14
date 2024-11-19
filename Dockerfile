FROM node:20-alpine
RUN mkdir /app
COPY package*.json /app/
WORKDIR /app
COPY . ./

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install -g pnpm
RUN pnpm i
RUN pnpm build
EXPOSE 3000
CMD ["pnpm", "run","start"]