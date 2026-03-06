pipeline {
    agent {
        docker { 
            image 'mcr.microsoft.com/playwright:v1.58.2-jammy' 
            args '-u root'
        }
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Pulling repository...'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing NPM packages...'
                sh 'npm ci'
            }
        }

        stage('Playwright UI Tests') {
            steps {
                script {
                    updateGitHubStatus('ci/jenkins/playwright-ui', 'Playwright tests started...', 'PENDING')
                }

                catchError(buildResult: 'FAILURE', stageResult: 'FAILURE') {
                    sh 'npx playwright test'
                }
            }
            
            post {
                always {
                    script {
                        if (currentBuild.result == 'FAILURE') {
                            updateGitHubStatus('ci/jenkins/playwright-ui', 'Playwright tests failed!', 'FAILURE')
                        } else {
                            updateGitHubStatus('ci/jenkins/playwright-ui', 'Playwright tests passed!', 'SUCCESS')
                        }
                    }
                }
            }
        }
    }

    post {
        always {
            allure results: [[path: 'allure-results']]
            archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true
        }
    }
}

def updateGitHubStatus(String contextName, String msg, String state) {
    step([
        $class: 'GitHubCommitStatusSetter',
        contextSource: [
            $class: 'ManuallyEnteredCommitContextSource',
            context: contextName
        ],
        statusResultSource: [
            $class: 'ConditionalStatusResultSource', 
            results: [
                [
                    $class: 'AnyBuildResult', 
                    message: msg, 
                    state: state
                ]
            ]
        ]
    ])
}