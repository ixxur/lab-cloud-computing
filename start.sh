# Stop and remove all running containers for the microservices
echo "Stopping and removing existing containers..."
docker-compose -f backend/user-service/docker-compose.yml down
docker-compose -f backend/book-service/docker-compose.yml down
docker-compose -f backend/borrowing-service/docker-compose.yml down
docker-compose -f frontend/docker-compose.yml down

# Rebuild and recreate containers
echo "Rebuilding and recreating containers..."
docker-compose -f backend/user-service/docker-compose.yml up --build -d
docker-compose -f backend/book-service/docker-compose.yml up --build -d
docker-compose -f backend/borrowing-service/docker-compose.yml up --build -d
docker-compose -f frontend/docker-compose.yml up --build -d

# Verify the status of the containers
echo "Containers have been recreated. Here is the status:"
docker ps

echo "Done!"