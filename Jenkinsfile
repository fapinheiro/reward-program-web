#!groovy
pipeline {
  agent { label 'nodejs' }
  options {
    skipDefaultCheckout() // Needed to avoid Git checkout for Docker slave
    disableConcurrentBuilds()
    timeout(time: 1, unit: 'HOURS')
    buildDiscarder(logRotator(daysToKeepStr: '2'))
  }
  environment {
    APP_NAME = "reward-program-web"
  }
  stages {
    stage ('Checkout') {
      steps {
        checkout scm
      }
    }
    stage ('Setup CI/CD Environment') {
      steps {
        script {
           // TODO
        }
      }
    }
    stage ('Build source') {
      steps {
        // npm
        sh '''
          mkdir -p .npm-global
          mkdir -p _cacache
          export PATH=.npm-global/bin:$PATH

          npm config set prefix '.npm-global'
          npm config set cache '_cacache'
          npm config set jobs 1
          npm config set strict-ssl false
          npm config set registry 'https://nexus.almuk.santanderuk.corp/repository/npm-group/'

          npm ci
          npm run build -- --prod --base-href /reward-program/
        '''

        stash name: 'app', includes: 'dist/,Dockerfile,conf/'
      }
    }

    stage ('Test') {
      steps {
        sh ("npm run pipeline-test")
      }
    }

    stage ('Vulnerability/Dependency Check') {
        environment {
            SONAR_SCANNER_OPTS='-Xmx512m' // Java heap memory size - limit set to 1/4 available memory
        }
        steps {
            // TODO dependency check
        }
    }
    stage ('Build and Upload Image') {
      agent { label 'docker' }
      steps {
        unstash("app")
        // TODO build and upload Doker image to registry
      }
    }

    stage ('Verify Image') {

      steps {
        // TODO Image vulnerability
      }
    }

    stage ('Deploy Image') {
      steps {
        // TODO 
      }
    }

    stage ('Verify Service') {
      steps {
        // TODO Liveness
      }
    }

 }
}
