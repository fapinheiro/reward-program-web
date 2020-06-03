# Build
docker image build -t fapinheiro/reward-program-web:1.0.0 .  

# Run
docker container run -d -p 80:80 --name reward-program-web --rm fapinheiro/reward-program-web:1.0.0
docker container run -p 80:80 --name reward-program-web --rm fapinheiro/reward-program-web:1.0.0

# Get inside
docker container run -it --rm fapinheiro/reward-program-web:1.0.0 sh
docker container exec -it containerid sh