#!/bin/bash -e
j2 /templates/default.conf.j2 > /etc/nginx/conf.d/default.conf
exec "$@"