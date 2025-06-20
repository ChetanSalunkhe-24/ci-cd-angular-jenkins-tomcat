# Tomcat Multi-Instance Environment Setup Guide

This guide explains how to configure **multiple Tomcat instances** on a single Windows machine to represent Dev, QA, Stage, and Production environments.

---

## Setup Overview

You’ll create four separate Tomcat folders:

```
C:\Program Files\Apache Software Foundation\
 ┣ Tomcat 11.0\         → Prod (8080)
 ┣ Tomcat 11.0-Stage\   → Stage (8081)
 ┣ Tomcat 11.0-QA\      → QA (8082)
 ┣ Tomcat 11.0-Dev\     → Dev (8083)
```

---

## Steps to Configure Each Instance

1. **Copy Tomcat Installation Folder**  
   - Copy base folder `Tomcat 11.0` three times  
   - Rename folders to `Tomcat 11.0-Dev`, `Tomcat 11.0-QA`, `Tomcat 11.0-Stage`

2. **Edit `server.xml` for Each**  
   - Go to `conf/server.xml` in each folder  
   - Change `port`, `shutdown port`, `HTTP connector` to avoid conflicts  

   **Example: For Dev (8083)**  
   ```xml
   <Server port="8006" shutdown="SHUTDOWN">
     <Service name="Catalina">
       <Connector port="8083" protocol="HTTP/1.1" ... />
   ```

3. **Change `CATALINA_BASE`**  
   - If running via service, use `service.bat` or manually edit env vars  
   - Ensure each instance uses its own base

4. **Create Separate `webapps` Folders**  
   - `webapps/` for Prod  
   - `webapps1/`, `webapps2/`, `webapps3/` for Stage, QA, Dev

---

## Final Outcome

You now have 4 Tomcat servers:
- **Prod:** http://localhost:8080/demo
- **Stage:** http://localhost:8081/demo
- **QA:** http://localhost:8082/demo
- **Dev:** http://localhost:8083/demo

Each can be started separately and deployed to independently via Jenkins.

---

## Tips

- Keep logs separate (`logs/` folder in each instance)
- Start/stop Tomcat manually or via script
- Ensure Java is properly configured
