FROM node:18-alpine

WORKDIR /app

# Dependencies installieren
COPY package*.json ./
RUN npm ci

# Projektdateien kopieren
COPY . .

# Build (damit du ein optimiertes Bundle hast)
RUN npm run build

# Vite Preview auf 0.0.0.0:8080
EXPOSE 8089

CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "8089"]
