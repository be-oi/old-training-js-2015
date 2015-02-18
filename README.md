
# beOI Training JS 
The Javascript client-side app for the training platform

## Install deps:
```bower install``` (bower.json)

```npm install```    (package.json)

## Developing:
launch server with ```grunt serve```

## Deploy on S3
```
aws s3 rm s3://beoi-training/ --profile perso --region eu-central-1 --recursive
aws s3 cp dist/ s3://beoi-training/ --profile perso --region eu-central-1 --recursive --acl public-read  --cache-control 'private, max-age=0, no-cache, must-revalidate' --exclude 'fonts/*' --exclude 'images/*' --exclude 'scripts/*.js' --exclude 'styles/*'
aws s3 cp dist/fonts/ s3://beoi-training/fonts/ --profile perso --region eu-central-1 --recursive --acl public-read 
aws s3 cp dist/images/ s3://beoi-training/images/ --profile perso --region eu-central-1 --recursive --acl public-read 
aws s3 cp dist/scripts/ s3://beoi-training/scripts/ --profile perso --region eu-central-1 --recursive --acl public-read --exclude '*html'
aws s3 cp dist/styles/ s3://beoi-training/styles/ --profile perso --region eu-central-1 --recursive --acl public-read 
```