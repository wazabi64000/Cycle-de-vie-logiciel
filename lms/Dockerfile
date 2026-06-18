FROM node:22-alpine

WORKDIR /app

COPY index.html ./
COPY cours-cda ./cours-cda/
COPY lms/package*.json ./lms/
RUN cd lms && npm ci --omit=dev
COPY lms/ ./lms/

WORKDIR /app/lms

ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

CMD ["node", "server.js"]
