# Reward Program Web

This is the front end of the Reward Program using Angular 8, Docker and Kubernates.

# Docker Build
docker image build -t fapinheiro/reward-program-web:x.x.x .

# Docker Run
docker pull fapinheiro/reward-program-web:x.x.x

docker container run --rm -p 80:80 --name reward-program-web fapinheiro/reward-program-web:x.x.x

docker container run --rm -it -p 80:80 --name reward-program-web fapinheiro/reward-program-web:x.x.x

# Docker Debug
docker container stop containerID

docker container exec -it containerID bash

docker container logs -f containerID

