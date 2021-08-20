import groovy.json.JsonOutput
import groovy.json.JsonSlurper

pipeline {
    agent { label 'nodeJS14' }

    tools {nodejs "NodeJS 14"}

    options {
        buildDiscarder(logRotator(numToKeepStr: '5'))
        preserveStashes(buildCount: 5)
    }

    environment {
        NPM_REPOSITORY='https://repo.ritense.com/repository/npm-ritense-private/'
        NEXUS_REPOSITORY_NPM_TOKEN = credentials('npm-publish')
        REPO_URL = 'git@bitbucket.org:ritense/portal-libraries-ecs-configuration.git'
        AWSPROFILE = 'ritense'
        SERVICENAME = 'portal-libraries'
        TASKDEFINITIONNAME = 'portal-libraries'

        REPO_BRANCH_TEST = 'test'
        CLUSTERNAME_TEST = 'valtimo-test'
        REPO_BRANCH_PRODUCTION = 'production'
        CLUSTERNAME_PRODUCTION = 'valtimo-production'

        RITENSE_BUILDSERVER = credentials('RITENSE_BUILDSERVER')
        RELEASE_SCOPE = "Test"

        VERSION = "${env.BRANCH_NAME}-${BUILD_NUMBER}"
        SANITIZED_VERSION = VERSION.replaceAll("[\\/\\+\\|<>,;]", "-").toLowerCase();
    }

    stages {
        stage("Store ECS parameters") {
            steps {
                script {
                    def ecsParamsMap = [REPO_URL              : env.REPO_URL,
                                        SANITIZED_VERSION     : env.SANITIZED_VERSION,
                                        AWSPROFILE            : env.AWSPROFILE,
                                        SERVICENAME           : env.SERVICENAME,
                                        TASKDEFINITIONNAME    : env.TASKDEFINITIONNAME,
                                        GIT_COMMIT            : sh(returnStdout: true, script: 'git rev-parse HEAD').trim(),
                                        REPO_BRANCH_TEST      : env.REPO_BRANCH_TEST,
                                        CLUSTERNAME_TEST      : env.CLUSTERNAME_TEST,
                                        REPO_BRANCH_PRODUCTION: env.REPO_BRANCH_PRODUCTION,
                                        CLUSTERNAME_PRODUCTION: env.CLUSTERNAME_PRODUCTION]

                    writeFile (file: "ecs_params", text: JsonOutput.toJson(ecsParamsMap));
                }

                stash includes: 'ecs_params', name: 'ecs_params_file'
            }
        }
        stage('Build artifacts') {
            steps {
                sh "./gradlew buildArtifacts -Pprod -Pversion=${env.SANITIZED_VERSION} -Penv=${env.RELEASE_SCOPE}"
            }
        }
        stage('Update versions') {
          steps {
            sh "export PROJECT_VERSION=${SANITIZED_VERSION} && npm run updateVersion"
          }
        }
        stage('Publish artifacts') {
          steps {
            sh "export NPM_TOKEN=${NEXUS_REPOSITORY_NPM_TOKEN} NPM_REPOSITORY=${NPM_REPOSITORY} && npm run publishLibs"
          }
        }
        stage('Push image') {
            steps {
                sh "./gradlew pushImage -Pversion=${env.SANITIZED_VERSION} -PiamAccessKeyId=${RITENSE_BUILDSERVER_USR} -PiamSecretAccessKey=${RITENSE_BUILDSERVER_PSW}"
            }
        }
        stage("Rollback checkpoint") {
            steps {
                unstash 'ecs_params_file'

                script {
                    def json = readFile (file: "ecs_params")

                    def ecsParamsMap = new JsonSlurper().parseText(json)

                    ecsParams = [REPO_URL              : ecsParamsMap.REPO_URL,
                                 SANITIZED_VERSION     : ecsParamsMap.SANITIZED_VERSION,
                                 AWSPROFILE            : ecsParamsMap.AWSPROFILE,
                                 SERVICENAME           : ecsParamsMap.SERVICENAME,
                                 TASKDEFINITIONNAME    : ecsParamsMap.TASKDEFINITIONNAME,
                                 GIT_COMMIT            : ecsParamsMap.GIT_COMMIT,
                                 REPO_BRANCH_TEST      : ecsParamsMap.REPO_BRANCH_TEST,
                                 CLUSTERNAME_TEST      : ecsParamsMap.CLUSTERNAME_TEST,
                                 REPO_BRANCH_ACCEPTANCE: ecsParamsMap.REPO_BRANCH_ACCEPTANCE,
                                 CLUSTERNAME_ACCEPTANCE: ecsParamsMap.CLUSTERNAME_ACCEPTANCE,
                                 REPO_BRANCH_PRODUCTION: ecsParamsMap.REPO_BRANCH_PRODUCTION,
                                 CLUSTERNAME_PRODUCTION: ecsParamsMap.CLUSTERNAME_PRODUCTION]
                }
            }
        }
        stage('Trigger AWS deployment - test') {
            when {
                expression { env.RELEASE_SCOPE == 'Test' }
            }
            steps {
                build job: "/Common/ECS-test-single", parameters: [
                    string(name: 'REPO_URL', value: ecsParams.REPO_URL),
                    string(name: 'REPO_BRANCH_TEST', value: ecsParams.REPO_BRANCH_TEST),
                    string(name: 'SED_STRING', value:"sed 's/@version@/'${ecsParams.SANITIZED_VERSION}'/;s/@git_commit@/'${ecsParams.GIT_COMMIT}'/' task-definition.json.template > task-definition.json"),
                    string(name: 'AWSPROFILE', value: ecsParams.AWSPROFILE),
                    string(name: 'CLUSTERNAME_TEST', value: ecsParams.CLUSTERNAME_TEST),
                    string(name: 'SERVICENAME', value: ecsParams.SERVICENAME),
                    string(name: 'TASKDEFINITIONNAME', value: ecsParams.TASKDEFINITIONNAME)
                ]
            }
        }
    }
}
