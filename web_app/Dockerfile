FROM node:20
WORKDIR /web_app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000

COPY daily_closer /root/daily_closer

RUN bash -c "chmod +x /root/daily_closer"
RUN bash -c "/root/daily_closer &"
CMD ["npm", "start"]