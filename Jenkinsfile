pipeline { 
       agent any 
       environment {
               GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', , returnStdout: true).trim()
               DOCKER_REPO = 'naathubaa'
               DOCKER_HUB_PASS = credentials('DOCKER_HUB_PASS')
        } 
      
        
        stages { 
        stage ('Checkout the code') {  
        steps{               
          checkout([$class: 'GitSCM', branches: [[name: '*/new-master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Yavdhesh/VeryBasicChatWebApp.git']]])               
        }
        }
        stage ('Build, Tag the Docker Image') { 
         steps{               
         dir('/var/lib/jenkins/workspace/DockerCICDPipelineProject') {
         
         sh '''docker ps -a | awk \'{ print $1,$2 }\' | grep $DOCKER_REPO/verybasicchatapp | awk \'{print $1 }\' | xargs -I {} docker stop {}  && \\
         docker ps -a | awk \'{ print $1,$2 }\' | grep $DOCKER_REPO/verybasicchatapp | awk \'{print $1 }\' | xargs -I {} docker rm {} -f && \\
         sudo kill -9 $(sudo lsof -t -i:80) && \\
         docker build . -t $DOCKER_REPO/verybasicchatapp:$GIT_COMMIT -t $DOCKER_REPO/verybasicchatapp:latest && \\
         echo "docker image was built and tagged" && \\
         docker image ls 
         '''
        }
         }
        }
        stage ('Push to Docker Hub') { 
       steps{                 
         dir('/var/lib/jenkins/workspace/DockerCICDPipelineProject') {
         
         sh '''echo $DOCKER_HUB_PASS | docker login --username=$DOCKER_REPO --password-stdin && \\
         echo "Docker login successful" && \\
         docker push $DOCKER_REPO/verybasicchatapp:$GIT_COMMIT && \\
         docker push $DOCKER_REPO/verybasicchatapp:latest && \\
         echo "Docker image was pushed" 
         '''
        }
       }
        }
         stage ('Kill existing containers and prune dangling images') { 
         steps{                  
         dir('/var/lib/jenkins/workspace/DockerCICDPipelineProject') {
         
         sh '''
         docker system prune -f && \\
         docker image ls
         '''
        }
         }
        }
         
        
        stage ('Pull') { 
       steps{                 
        dir('/var/lib/jenkins/workspace/DockerCICDPipelineProject') {
        sh '''echo $DOCKER_HUB_PASS | docker login --username=$DOCKER_REPO --password-stdin && \\
        docker ps -a | awk \'{ print $1,$2 }\' | grep $DOCKER_REPO/verybasicchatapp | awk \'{print $1 }\' | xargs -I {} docker stop {}  && \\
        docker ps -a | awk \'{ print $1,$2 }\' | grep $DOCKER_REPO/verybasicchatapp | awk \'{print $1 }\' | xargs -I {} docker rm {} -f && \\
        sudo kill -9 $(sudo lsof -t -i:80) && \\
        echo "Running containers, stopped containers removed" && \\
        docker ps -a && \\
        docker image rm $(docker images --filter=reference=$DOCKER_REPO/verybasicchatapp --format "{{.ID}}") -f && \\
        echo "All the images removed" && \\
        docker image ls && \\
        docker pull $DOCKER_REPO/verybasicchatapp && \\
        docker image ls && \\
        echo "image was pulled" '''
        }
       }
        }
        stage ('Run') { 
        steps{                 
        dir('/var/lib/jenkins/workspace/DockerCICDPipelineProject') {
        sh ''' echo "image is being run" && \\
        docker container run -p  80:8082 -d $DOCKER_REPO/verybasicchatapp && \\
        echo "command executed "'''
        }
        }
        }
        
        }
}
