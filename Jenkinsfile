//This pipeline assumes the following plugins exist on the Jenkins instance:
//TBD

pipeline {
	agent any

	stages {
		stage('Deploy') {
			steps{
				dir('static') {
					sh('/root/.local/bin/aws s3 sync . s3://dev.whitepapers.gcardona.me --delete --acl "public-read"')
				}
			}
		}
	}
}