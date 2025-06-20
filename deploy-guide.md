# Deploy Guide: Angular CI/CD Pipeline with AWS

This guide walks you through setting up a full CI/CD pipeline to deploy an Angular application using:

- AWS CodePipeline
- AWS CodeBuild
- AWS ECR
- AWS ECS (Fargate)
- GitHub

---

## Pre-Requisites

- AWS account with admin permissions
- GitHub repo with Angular code
- Docker installed (on CodeBuild image)
- ECR repository created: `angular-app`
- ECS cluster created with 3 services (Dev, QA, Prod)
- IAM roles:
  - `ecsTaskExecutionRole`
  - `codebuild-role` with access to ECR, ECS, CloudWatch

---

## Steps

### 1. Create ECR Repository
```bash
aws ecr create-repository --repository-name angular-app
```

### 2. Prepare `buildspec.yml`
Put this inside `infra/buildspec.yml`. Replace `<region>` and `<aws_account_id>`.

### 3. Create ECS Task Definition
Use `infra/task-definition.json` and register it using AWS Console or CLI.

### 4. Create CodeBuild Project
- Source: GitHub
- Buildspec: Use provided `buildspec.yml`
- Role: `codebuild-role`

### 5. Create CodePipeline
- **Source stage**: GitHub
- **Build stage**: CodeBuild project
- **Deploy stage**: ECS (Fargate)
- Add **manual approvals** between QA and Prod

### 6. Setup ECS Services
- Dev → No approval needed
- QA, Prod → Require manual approval
- Use the same task definition for all

---

## Test the Pipeline

- Push code to GitHub
- CodePipeline triggers automatically
- CodeBuild builds Angular & Docker image → pushes to ECR
- ECS gets updated and redeploys container
- Visit ECS public IP to view app

---

## Logs & Monitoring

- **Build logs**: CodeBuild → CloudWatch Logs
- **Runtime logs**: ECS Tasks → CloudWatch Logs

---

## Best Practices

- Use version tags (`v1`, `v2`) instead of `latest` in production
- Limit IAM permissions for CodeBuild and ECS roles
- Monitor ECS metrics using CloudWatch Dashboards

---

Need help with IaC (Terraform/CDK/CloudFormation)? Let me know!
