#!/bin/bash
# Deployment script for sdt-validation-server-api
# Purpose: copies the correct docker-compose, requirements.txt, and .env file to
#          the correct locations and then runs the docker commands and initialization
#          scripts.
# Command: ./deploy.sh [environment]] -[destroy] -[restart]  > deployment.log
# Options: environment = development, staging, or production
#          -destroy = delete all containers and images before Building
#          -restart = restart docker-machine before building Containers
#          > deployment.log = write starttup messages to a file 'deployment.log'
#

echo "-----------------------------------------------------"
echo "Starting build:  $(date)"
echo "-----------------------------------------------------"
SECONDS=0

while getopts "e:m:r:d:i:c:o:" option; do
  case $option in
    e ) env=$OPTARG
    ;;
    d ) destroy=$OPTARG
    ;;
    i ) import=$OPTARG
    ;;
    c ) check=$OPTARG
    ;;
    o ) options=$OPTARG
    ;;
  esac
done


if [[ "$destroy" == "destroy" ]]
then
  destroy=1
else
  destroy=0
fi

if [[ "$restart" == "restart" ]]
then
  restart=1
else
  restart=0
fi

if [[ "$import" == "import" ]]
then
  import=1
else
  import=0
fi

if [[ "$check" == "check" ]]
then
  check=1
else
  check=0
fi

if [[ "$options" == "interactive" ]]
then
  interactive=1
else
  interactive=0
fi


if [[ "$env" == "prod" ]]
then
  environment="production"
elif [[ "$env" == "stg" ]]
then
  environment="staging"
elif [[ "$env" == "dev" ]]
then
  environment="development"
else
  environment=$env
fi


echo "-----------------------------------------------------"
echo "Inputs from command"
echo "-----------------------------------------------------"
echo "env: $env"
echo "environment: $environment"
echo "destroy: $destroy"
echo "import: $import"
echo "check: $check"

#else
#  echo "-----------------------------------------------------"
#  echo "Docker not installed - no restart is possible"
#  echo "-----------------------------------------------------"
#fi
#Open Docker, only if is not running
if (! docker stats --no-stream ); then
  sudo service docker start;
#Wait until Docker daemon is running and has completed initialisation
while (! docker stats --no-stream ); do
  # Docker takes a few seconds to initialize
  echo "Waiting for Docker to launch..."
  sleep 1
done
fi



echo "-----------------------------------------------------"
echo "Checking if destroy command was passed"
echo "-----------------------------------------------------"
if (($destroy != 0 ))
then
    echo "-------------------------------------------------------------------"
    echo "Destroy was passed -- clearing out existing containers and images."
    echo "-------------------------------------------------------------------"
    eval $(docker stop $(docker ps -a -q)  && docker rm $(docker ps -a -q) --force && docker rmi $(docker images -a -q) --force && docker volume rm $(docker volume ls -q) --force)
else
echo "-----------------------------------------------------"
echo "Destroy was not passed -- using containers."
echo "-----------------------------------------------------"
fi


  # Build Containers
  echo "-----------------------------------------------------"
  echo "Building containers"
  echo "-----------------------------------------------------"
  docker-compose -f docker-compose.yml build

  # Start Containers
  echo "-----------------------------------------------------"
  echo "Starting containers"
  echo "-----------------------------------------------------"

  docker-compose -f docker-compose.yml up  -d --remove-orphans
  #docker system prune --all --volumes --force

  sleep 15



