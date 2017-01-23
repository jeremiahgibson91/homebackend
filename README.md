# Home-Backend Microservice

How to
* docker build -t homebackend .
* docker run -d -p 80:4000 homebackend

Open a proxy to the kubernetes dashboard for cluster-homebase
```
kubectl proxy
```
http://localhost:8001

Steps to update backend running pod in cluster:
* 1)Commit changes to master branch at github
* 2)Trigger the update at hub.docker.com pulls from github
```
*https://hub.docker.com/r/jeremiahgibson91/homebackend/~/settings/automated-builds/
```
* 3)Run kubectl rolling update pull from docker hub updates live ip
```
* kubectl rolling-update --image jeremiahgibson91/homebackend homebase --image-pull-policy Always
```
