# Lean Startup Project

## Configuration

### Backend (NestJS)
1. Copier `.env.example` vers `.env` dans le dossier `backend`
2. Configurer les variables d'environnement :
   - `MONGODB_URI` : URL de connexion MongoDB
   - `JWT_SECRET` : Clé secrète pour JWT
   - `PORT` : Port du serveur (défaut: 3001)

### Frontend (Next.js)
1. Copier `.env.example` vers `.env` dans le dossier `frontend`
2. Configurer les variables d'environnement :
   - `NEXT_PUBLIC_API_URL` : URL de l'API backend

## Développement

### Backend
```bash
cd backend
npm install
npm run start:dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Production

### Backend
```bash
cd backend
npm run build
npm run start:prod
```

### Frontend
```bash
cd frontend
npm run build
npm start
```

## Déploiement

### Prérequis
- Node.js 18+
- MongoDB
- PM2 (optionnel, pour la gestion des processus)

### Étapes
1. Configurer les variables d'environnement pour la production
2. Build des applications
3. Déployer sur votre serveur
4. Configurer un reverse proxy (Nginx recommandé)
5. Configurer SSL/TLS

## Sécurité
- Les secrets sont stockés dans les variables d'environnement
- CORS est configuré pour la production
- Les mots de passe sont hashés avec bcrypt
- JWT pour l'authentification

# Plateforme d'Appels d'Offres pour Artisans

Cette plateforme permet aux artisans et professionnels de métiers manuels de consulter et répondre à des appels d'offres.

## Structure du Projet

- `frontend/` : Application Next.js (TypeScript + Tailwind CSS)
- `backend/` : API NestJS (TypeScript + MongoDB)

## Prérequis

- Node.js (v18 ou supérieur)
- npm
- MongoDB

## Installation

### Frontend

```bash
cd frontend
npm install
```

### Backend

```bash
cd backend
npm install
```

## Démarrage

### Frontend

```bash
cd frontend
npm run dev
```

L'application sera accessible sur http://localhost:3000

### Backend

```bash
cd backend
npm run start:dev
```

L'API sera accessible sur http://localhost:3001

## Fonctionnalités

- Authentification (inscription/connexion)
- Profil utilisateur
- Consultation des appels d'offres
- Filtrage par localisation et domaine d'activité 
