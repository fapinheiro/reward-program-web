FROM nginx:1.15.8-alpine

LABEL maintainerName="Filipe Pinheiro"

LABEL maintainerEmail="filipe.alves.pinheiro@gmail.com"

ENV ENVIRONMENT dev

# Packages to generate NGINX config at runtime
RUN apk --no-cache add \
        python2 \
        py2-pip && \
        pip2 install j2cli[yaml]
RUN apk add --update bash && rm -rf /var/cache/apk/*

# Remove NGINX pages 
# TODO put your server identity pages
RUN rm /usr/share/nginx/html/*

# Copy Angular project
COPY /dist /usr/share/nginx/html/

# Copy NGINX configs
COPY nginx/nginx.conf /etc/nginx/
COPY nginx/default.conf.j2 /templates/

# Prepare container startup scripts
COPY docker-entrypoint.sh /

ENTRYPOINT [ "/docker-entrypoint.sh" ]

CMD ["nginx", "-g", "daemon off;"]
