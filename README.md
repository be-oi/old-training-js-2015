
# beOI Training JS 
The Javascript client-side app for the training platform

## Install deps:
```bower install``` (bower.json)
```npm install```    (package.json)

## Developing:
launch server with ```grunt serve```

Deploy on S3:
```
aws s3 rm s3://beoi-training/ --profile perso --region eu-central-1 --recursive
aws s3 cp dist/   s3://beoi-training/ --profile perso --region eu-central-1 --recursive --acl public-read  --cache-control 'private, max-age=0, no-cache, must-revalidate'
```