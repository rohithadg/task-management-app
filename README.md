# Task Management App

This is the frontend app for the Task Management. It is built with React, TypeScript, MUI, Tailwind CSS, Vite and deploying to AWS with Terraform.

## Features
- Tasks List
- Task Form to add/edit tasks
- Ability to change Task Status
- Delete a task

## Run locally
NodeJs, Terraform and AWS CLI should be installed first.

Before run, update the `.env` for the Backend url.

```bash
npm i
npm run dev
```
Access the app in browser http://localhost:5173/ 

## Deploy into AWS

Make sure you have AWS credentials setup in your environment.

Run the `deploy.sh`

```bash
sh ./deploy.sh
```

If you have multiple AWS profiles, then,

```bash
AWS_PROFILE=<your-profile> sh ./deploy.sh
```
end of the run, grab the CloudFront URL and access via browser.

## Delete the deployment in AWS

To delete all the frontend related resources in AWS,

```bash
terraform destroy -auto-approve
```

if you have multiple AWS profiles,

```bash
AWS_PROFILE=<your-profile> terraform destroy -auto-approve
```

## AWS resources used

- S3
Deploying to S3 as a static website. Granted permissions to CloudFront by S3 Bucket Policy
- CloudFront
CloudFront used as the CDN

## Assumptions and Limitations

- Assumed no user authentication/authorization needed
- No special security features are implemented such as CORS
- To keep it simple, no filtering or sorting implemented
