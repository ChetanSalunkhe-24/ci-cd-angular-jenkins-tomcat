# CI/CD Pipeline for Angular Application using AWS Cloud-Native Services

This project showcases a complete CI/CD pipeline using AWS cloud-native tools to build, test, containerize, and deploy an Angular application across multiple environments (**Dev**, **QA**, **Prod**) using **AWS ECS (Fargate)**.

---

## Project Summary

A GitHub-driven workflow where:
- Code pushes trigger an automated pipeline using **AWS CodePipeline**
- **AWS CodeBuild** builds and tests the Angular app
- Docker image is pushed to **AWS ECR**
- ECS (Fargate) runs separate services for **Dev**, **QA**, and **Prod**
- **Manual approvals** ensure safe deployment across environments
- **AWS CloudWatch** handles centralized logging and monitoring

---

## CI/CD Architecture

![Architecture Diagram](./architecture-diagram.png)

---

## Tools & Technologies

| Purpose             | Tool/Service               |
|---------------------|----------------------------|
| Version Control      | GitHub                     |
| CI & Build           | AWS CodeBuild              |
| Container Registry   | AWS ECR                    |
| CD & Approvals       | AWS CodePipeline           |
| Deployment Runtime   | AWS ECS (Fargate)          |
| Monitoring/Logging   | AWS CloudWatch             |

---

## Pipeline Flow

1. **Code Commit:** Developer pushes code to GitHub
2. **CI Process:** CodePipeline triggers CodeBuild
   - Installs dependencies
   - Runs unit tests
   - Builds Angular app
3. **Docker Image:**
   - Docker image is built
   - Image is tagged as `latest` and pushed to ECR
4. **CD Process:**
   - Manual approval required to promote to QA and Prod
   - ECS updates service with the new Docker image
5. **Monitoring:**
   - Logs from ECS and CodeBuild streamed to CloudWatch

---

## Environment Strategy

| Environment | ECS Service       | Approval Required |
|-------------|-------------------|-------------------|
| Dev         | `angular-dev`     |        No         |
| QA          | `angular-qa`      |        Yes        |
| Prod        | `angular-prod`    |        Yes        |

---

## Repo Structure

```
aws-devops-angular-pipeline/
├── app/                        # Angular source code
├── infra/
│   ├── buildspec.yml
│   └── task-definition.json
├── screenshots/
├── architecture-diagram.png
├── deploy-guide.md
└── README.md
```

---

## Demo & LinkedIn Post

🎥 [Watch My CI/CD Pipeline in Action (LinkedIn)](https://www.linkedin.com/posts/chetan-salunkhe-a84a32196_im-excited-to-share-my-article-on-building-activity-7299814903219953665--Yrm?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC4SHoQB00qaZ_Xt44nUb3Y5gkj6bvBSPIM)

This post is an walkthrough demonstrates the full deployment process of the Angular application using AWS CodePipeline, CodeBuild, ECR, and ECS.

---

## 👨‍💻 Author

**Chetan Salunkhe**   
🔗 [LinkedIn](www.linkedin.com/in/chetan-salunkhe-a84a32196)
