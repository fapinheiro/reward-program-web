# Reward Program Web

This is the front end of the Reward Program using Angular 8

# Docker Build
docker image build -t fapinheiro/reward-program-web:x.x.x .

# Docker Run
docker pull fapinheiro/reward-program-api:x.x.x

docker container run --rm -p 8089:8089 --name reward-program-api fapinheiro/reward-program-api:x.x.x

docker container run --rm -it -p 8089:8089 --name reward-program-api fapinheiro/reward-program-api:x.x.x

# Docker Debug
docker container stop containerID

docker container exec -it containerID bash

docker container logs -f containerID

