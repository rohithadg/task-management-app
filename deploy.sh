#!/bin/bash

npm run build

terraform init
terraform apply -auto-approve
BUCKET_NAME=$(terraform output -raw s3_bucket_name)

aws s3 sync ./dist s3://$BUCKET_NAME --delete --profile gd

echo "Deployment complete!"
echo "CloudFront URL: $(terraform output -raw cloudfront_url)"