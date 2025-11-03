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


## 🚀 Deployment Guide

### CI (GitHub Actions)

- On push to `main` or when a pull request targets `main`, the GitHub Actions workflow builds a Docker image and pushes it to Docker Hub as `rishi272004/moviebooking:latest`.
- The workflow file is at: `.github/workflows/ci.yml`.
- Make sure you add the following repository secrets in GitHub: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`.

### CD (Kubernetes)

Manifests are provided in the `k8s/` folder:

- `k8s/configmap.yaml`  — non-sensitive config values
- `k8s/deployment.yaml` — Deployment that pulls `rishi272004/moviebooking:latest`
- `k8s/service.yaml`    — LoadBalancer Service exposing the app

Apply the manifests:

```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

IMPORTANT: Do NOT store secrets in the repository. Create Kubernetes secrets manually (example):

```bash
kubectl create secret generic moviebooking-secrets \
	--from-literal=CLERK_SECRET_KEY="<your_key>" \
	--from-literal=INNGEST_EVENT_KEY="<your_key>" \
	--from-literal=INNGEST_SIGNING_KEY="<your_key>" \
	--from-literal=STRIPE_PUBLISHABLE_KEY="<your_key>" \
	--from-literal=STRIPE_SECRET_KEY="<your_key>" \
	--from-literal=STRIPE_WEBHOOK_SECRET="<your_key>"
```

After the Service is created, get the external IP:

```bash
kubectl get service moviebooking-service
```

Notes & best practices:

- Store sensitive values in GitHub Actions secrets (for CI) and Kubernetes Secrets (for runtime).
- The CI workflow uses Docker Buildx and caching to speed up builds; it logs only non-sensitive information and uses GitHub Secrets for credentials.
- If deploying in production, consider adding:
	- readiness/liveness probes in `deployment.yaml`
	- resource requests/limits
	- rolling update strategy and PodDisruptionBudgets
	- image tag pinning (avoid `latest`) and automated rollouts

---

✅ Final setup summary:

- GitHub Actions builds and pushes the Docker image to Docker Hub.
- Kubernetes (`k8s/`) pulls the image and runs the app. Secrets are created manually and never committed to the repo.
