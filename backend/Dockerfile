# 1. Base Image
FROM node:18

# 2. Set working directory
WORKDIR /app

# 3. Copy package.json & package-lock.json zuerst (bessere Caching)
COPY package*.json ./

# 4. Install dependencies
RUN npm install --production

# 5. Copy rest of the backend code
COPY . .

# 6. Expose Backend Port
EXPOSE 3099

# 7. Start command
CMD ["node", "server.js"]
