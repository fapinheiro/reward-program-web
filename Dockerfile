FROM nginx:1.15.8-alpine

LABEL maintainerName="Filipe Pinheiro"

LABEL maintainerEmail="filipe.alves.pinheiro@gmail.com"

ENV ENVIRONMENT dev

RUN rm /usr/share/nginx/html/*

COPY /dist /usr/share/nginx/html/
COPY nginx/custom.conf /etc/nginx/conf.d/

# RUN mkdir /usr/share/nginx/html/assets
# RUN mv /usr/share/nginx/html/images /usr/share/nginx/html/assets

CMD ["nginx", "-g", "daemon off;"]
