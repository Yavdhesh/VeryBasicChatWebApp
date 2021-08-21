# Chat application web app using Node js
### It is a demo for NodeJs Application being containerized and then run into an environment ###
### As a part of Simpli learn Docker Project ###
### there are two parts of the project
### 1) DockerPushProject
### 2) DockerPullProject

## `[DockerPushProject]` :
### [ Docker Build using Dockerfile]
#### It will checkout the github repository.
#### During the docker image build, copy the package.json/package-lock.json inside /usr/bin/app directory.
#### Then run the `npm install` command to install the dependencies inside the /usr/bin/app directory under npm_modules
#### After the above command run, we will copy all the application code files inside /usr/bin/app.
#### We are exposing 8082 port on the docker image
