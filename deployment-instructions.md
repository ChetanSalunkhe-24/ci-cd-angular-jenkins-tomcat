# Jenkins CI/CD Pipeline Configuration

This document describes how Jenkins is configured to automate the CI/CD process for an Angular application using Apache Tomcat as the deployment server.

---

## Jenkins Job Breakdown

### 1. `pull-code` (GitHub Clone)
- Uses Git plugin
- Clones Angular code from GitHub repo using HTTPS or SSH

### 2. `test-code` (Karma Unit Tests)
- Runs `npm install` and `ng test`
- Test result reporting configured via Jenkins plugins

### 3. `build-code` (Angular Build)
- Uses:
  ```bash
  npm install
  ng build --configuration=production
  ```
- Output goes to `/dist/` folder

### 4. `deploy-code` (Shell/BAT script)
- Uses `xcopy` to move built files to the correct Tomcat `webapps` folders
- Deploys sequentially to Dev → QA → Stage → Prod
- Each environment includes **manual approval** before proceeding

---

## Deployment Script Example (Windows Batch)

```bat
:: Deploy to Dev (Tomcat on port 8083)
xcopy /E /I /Y "C:\Jenkins\workspace\build-code\dist\demo" "C:\Program Files\Apache Software Foundation\Tomcat 11.0\webapps3\demo\"

:: Deploy to QA
xcopy /E /I /Y "C:\Jenkins\workspace\build-code\dist\demo" "C:\Program Files\Apache Software Foundation\Tomcat 11.0\webapps2\demo\"

:: Deploy to Stage
xcopy /E /I /Y "C:\Jenkins\workspace\build-code\dist\demo" "C:\Program Files\Apache Software Foundation\Tomcat 11.0\webapps1\demo\"

:: Deploy to Prod
xcopy /E /I /Y "C:\Jenkins\workspace\build-code\dist\demo" "C:\Program Files\Apache Software Foundation\Tomcat 11.0\webapps\demo\"
```

---

## Jenkins Configuration Details

- **Node.js & npm** installed on Jenkins host
- **Angular CLI** installed globally
- **Karma & ChromeHeadless** used for testing
- Jenkins runs on Windows

---

## Trigger & Approval Flow

1. Pull, Test, Build → Automatically triggered
2. Deploy → Manual approval between each stage

---

## Notes

- Jenkins jobs use **freestyle projects**
- Ensure Tomcat folders exist and are writable
- Restart Tomcat if needed to reflect new changes
