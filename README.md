## 🚀 Features

### 👤 User Features

- 🔐 **Authentication using Clerk** – Sign In / Sign Up with secure session handling
- 🎥 **Browse Movies** – View now showing movies with detailed info, cast, and ratings
- 🪑 **Select Seats** – Interactive seat layout with real-time availability and booking limits
- ⏰ **Choose Show Timings** – Filter shows by date and time
- 💳 **Online Payments** – Stripe integration for secure checkout and booking confirmation
- ❤️ **Add to Favorites** – Save favorite movies to your personal list
- 🎫 **My Bookings** – View and manage all your past and upcoming bookings
- 📱 **Mobile Responsive** – Fully responsive design for phones, tablets, and desktops

---

### 🛠️ Admin Features

- 📊 **Admin Dashboard** – Overview of bookings, users, and currently running shows
- 🎬 **Add Shows** – Easily add new movie showings with date, time, and poster
- 📋 **List Shows & Bookings** – Manage all movies, bookings, and user data in one place

---

## ⚙️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS, Clerk |
| **Backend** | Node.js, Express, MongoDB |
| **Payments** | Stripe |
| **Background Jobs** | Inngest |
| **Image Storage** | Cloudinary |
| **Authentication** | Clerk |
| **Deployment (Frontend)** | Vercel |
| **Deployment (Backend)** | Kubernetes (optional) |

---

## 🚀 Deployment Guide

### **Frontend (Vercel)**
- Auto-deployed on push to `main`
- React app builds automatically via Vite
- No manual setup needed

### **Backend (Kubernetes)**

**Option 1: Local Development**
```bash
cd server
npm install
npm run server
```

**Option 2: Kubernetes Deployment**

Manifests are in the `k8s/` folder:
- `k8s/configmap.yaml` — Non-sensitive config values
- `k8s/deployment.yaml` — Backend deployment 
- `k8s/service.yaml` — Service to expose the app

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

**Create Kubernetes secrets (replace with your actual values):**
```bash
kubectl create secret generic moviebooking-secrets \
  --from-literal=CLERK_SECRET_KEY="<your_key>" \
  --from-literal=INNGEST_EVENT_KEY="<your_key>" \
  --from-literal=INNGEST_SIGNING_KEY="<your_key>" \
  --from-literal=STRIPE_PUBLISHABLE_KEY="<your_key>" \
  --from-literal=STRIPE_SECRET_KEY="<your_key>" \
  --from-literal=STRIPE_WEBHOOK_SECRET="<your_key>" \
  --from-literal=MONGODB_URL="<your_url>"
```

### **CI/CD Pipeline (GitHub Actions)**
- Workflow: `.github/workflows/ci.yml`
- Builds Docker image on push to `main`
- Pushes to Docker Hub: `rishi272004/moviebooking:latest`

**Required GitHub Secrets:**
- `DOCKERHUB_USERNAME`
- `DOCKERHUB_TOKEN`

---

✅ **Summary:**
- **Frontend** deploys automatically to Vercel
- **Backend** runs on Kubernetes (or locally during development)
- **Docker** packages the backend for consistent deployment
- **GitHub Actions** automates Docker image builds
