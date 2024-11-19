FROM node:20-alpine
RUN mkdir /app
COPY package*.json /app/
WORKDIR /app
COPY . ./

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "run","start"]