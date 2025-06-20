# CI/CD Pipeline: Angular Application with Jenkins and Tomcat

This project demonstrates a full CI/CD pipeline for deploying an Angular application using **Jenkins** and **Apache Tomcat**. The pipeline is designed to support deployments across multiple environments: **Dev**, **QA**, **Stage**, and **Production** using separate Tomcat instances configured on different ports.

---

## Tech Stack

- **Frontend**: Angular
- **CI/CD**: Jenkins
- **Web Server**: Apache Tomcat 11
- **Scripting**: Windows Batch Scripts (`xcopy`)
- **Source Control**: GitHub

---

## Repository Structure

```
ci-cd-angular-jenkins-tomcat/
 ┣ deployment-scripts/            # Scripts to deploy Angular build to Tomcat
 ┣ deployment-instructions.md     # Jenkins CI/CD configuration
 ┣ tomcat-setup-guide.md          # Details on multi-instance Tomcat setup
 ┣ screenshots/                   # Screenshots of Jenkins, deployed app, etc.
 ┗ README.md                      # You're here!
```

---

## Environments Configuration

| Environment | Tomcat Port | Path                           |
|-------------|-------------|--------------------------------|
| Dev         | 8083        | `webapps3/demo/`               |
| QA          | 8082        | `webapps2/demo/`               |
| Stage       | 8081        | `webapps1/demo/`               |
| Prod        | 8080        | `webapps/demo/`                |

---

## Jenkins Job Pipeline

| Job Name      | Description                                                  |
|---------------|--------------------------------------------------------------|
| `pull-code`   | Clones Angular app code from GitHub                         |
| `test-code`   | Runs unit tests using Karma                                 |
| `build-code`  | Builds Angular app using Node.js and npm                    |
| `deploy-code` | Deploys build to Tomcat (Dev → QA → Stage → Prod)           |

Each stage is triggered manually with approvals between environments.

---

## How It Works

- Jenkins pulls code from GitHub
- Runs tests and builds Angular project
- Uses a shell script (`xcopy`) to deploy the `dist/` folder to corresponding Tomcat `webapps` directory

See [`deployment-instructions.md`](./deployment-instructions.md) and [`tomcat-setup-guide.md`](./tomcat-setup-guide.md) for full setup details.

---

## Screenshots

Add screenshots of Jenkins UI, build logs, and app running on each environment in the `screenshots/` folder.

---

## Author

**Chetan Salunkhe**  
🔗 [LinkedIn](www.linkedin.com/in/chetan-salunkhe-a84a32196)
🔗 [LinkedIn-Post](https://www.linkedin.com/posts/chetan-salunkhe-a84a32196_excited-to-share-my-article-on-building-a-activity-7289852350087757824-J9ye?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC4SHoQB00qaZ_Xt44nUb3Y5gkj6bvBSPIM)
