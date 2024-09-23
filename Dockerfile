# Usa uma imagem oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copia os arquivos de package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instala as dependências da aplicação
RUN npm install

# Copia o restante dos arquivos do projeto para o contêiner
COPY . .

COPY ./prisma ./package.json ./package-lock.json ./.npmrc /app/

# Aplica migrações do Prisma
RUN npx prisma migrate deploy

# Expõe a porta 3000 que a aplicação vai usar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start:prod"]
