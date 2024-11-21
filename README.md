# **GSB-Frais API**

## 🏥 Introduction

L'API **GSB-Frais** est conçue pour gérer les données relatives aux visiteurs médicaux, leurs visites, les praticiens rencontrés, ainsi que les motifs associés. Elle repose sur **Node.js**, **Express.js**, et **MongoDB**, avec une architecture robuste et extensible.

Cette documentation vous guidera pour configurer, utiliser et étendre cette API.

---

## 🌟 Fonctionnalités principales

- **Gestion des visiteurs médicaux** : suivi des coordonnées, des visites associées, et des détails de chaque utilisateur.
- **Suivi des visites** : gestion des dates, commentaires, praticiens visités et motifs.
- **Administration des praticiens** : coordonnées, localisation et association avec les visites.
- **Gestion des motifs** : catégorisation des motifs des visites.
- **Relations inter-objets** : les entités sont liées pour simplifier les requêtes et les mises à jour.

---

## 📋 Table des matières

1. [Prérequis](#prérequis)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Démarrage](#démarrage)
5. [Structure du projet](#structure-du-projet)
6. [Modèles de données](#modèles-de-données)
7. [Endpoints](#endpoints)
8. [Tests](#tests)
9. [Contribution](#contribution)
10. [Licence](#licence)

---

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- **Node.js** (16+ recommandé) : [Télécharger Node.js](https://nodejs.org)
- **npm** ou **yarn** pour gérer les dépendances.
- **MongoDB** pour la base de données.
- Outils de test comme **Postman** ou **Insomnia**.

---

## ⚙️ Installation

Clonez ce dépôt et installez les dépendances :

```bash
git clone https://github.com/OmegazonCMoi/gsb-api-express.git
cd gsb-api-express
npm install
```

---

## 🛠️ Configuration

1. Créez un fichier `.env` à la racine du projet en vous basant sur le fichier modèle `.env.example` :

   ```bash
   cp .env.example .env
   ```

2. Configurez les variables d'environnement dans `.env` :

   ```env
   PORT=3000
   DB_URI=mongodb://localhost:27017/gsb-frais
   JWT_SECRET=une_phrase_secrete_super_securisee
   ```

---

## ▶️ Démarrage

Lancez le projet en mode développement :

```bash
npm run dev
```

Pour le mode production :

```bash
npm start
```

L'API sera accessible sur `http://localhost:<PORT>`.

---

## 📂 Structure du projet

```
📁 gsb-api-express
├── 📁 src
│   ├── 📁 controllers      # Logique des routes
│   ├── 📁 middlewares      # Gestion des erreurs et authentification
│   ├── 📁 models           # Modèles de base de données (Mongoose)
│   ├── 📁 routes           # Définition des routes Express
│   ├── 📁 utils            # Fonctions utilitaires
│   └── server.js           # Point d'entrée principal
├── 📁 tests                # Tests unitaires et d'intégration
├── .env                    # Variables d'environnement
├── package.json            # Fichier de configuration npm
└── README.md               # Documentation
```

---

## 📊 Modèles de données

### **Visiteur**

| Champ        | Type                | Obligatoire | Description                    |
|--------------|---------------------|-------------|--------------------------------|
| `id`         | `Number`            | ✅           | Identifiant unique            |
| `nom`        | `String`            | ✅           | Nom du visiteur               |
| `prenom`     | `String`            | ✅           | Prénom du visiteur            |
| `tel`        | `String`            | ✅           | Numéro de téléphone           |
| `email`      | `String` (unique)   | ✅           | Adresse e-mail                |
| `dateEmbauche` | `Date`            | ✅           | Date d'embauche               |
| `visites`    | `[ObjectId]` (ref: `Visite`) | ✅   | Liste des visites associées   |

---

### **Visite**

| Champ        | Type                | Obligatoire | Description                    |
|--------------|---------------------|-------------|--------------------------------|
| `id`         | `Number`            | ✅           | Identifiant unique            |
| `dateVisite` | `Date`              | ✅           | Date de la visite             |
| `commentaire`| `String`            | ✅           | Commentaire sur la visite     |
| `visiteur`   | `ObjectId` (ref: `Visiteur`) | ✅   | Visiteur ayant effectué la visite |
| `praticien`  | `ObjectId` (ref: `Praticien`) | ✅   | Praticien visité              |
| `motif`      | `ObjectId` (ref: `Motif`) | ✅       | Motif de la visite            |

---

### **Praticien**

| Champ        | Type                | Obligatoire | Description                    |
|--------------|---------------------|-------------|--------------------------------|
| `id`         | `Number`            | ✅           | Identifiant unique            |
| `nom`        | `String`            | ✅           | Nom du praticien              |
| `prenom`     | `String`            | ✅           | Prénom du praticien           |
| `tel`        | `String`            | ✅           | Numéro de téléphone           |
| `email`      | `String` (unique)   | ✅           | Adresse e-mail                |
| `rue`        | `String`            | ✅           | Adresse du praticien          |
| `ville`      | `String`            | ✅           | Ville                         |
| `codePostal` | `String`            | ✅           | Code postal                   |
| `visites`    | `[ObjectId]` (ref: `Visite`) | ✅   | Liste des visites associées   |

---

### **Motif**

| Champ        | Type                | Obligatoire | Description                    |
|--------------|---------------------|-------------|--------------------------------|
| `id`         | `Number`            | ✅           | Identifiant unique            |
| `libelle`    | `String`            | ✅           | Description du motif          |

---

## 🌐 Endpoints

Voici quelques exemples des routes disponibles :

### **Visiteur**

| Méthode | Endpoint          | Description                    |
|---------|-------------------|--------------------------------|
| `GET`   | `/visiteurs`      | Liste tous les visiteurs       |
| `POST`  | `/visiteurs`      | Crée un nouveau visiteur       |

### **Visite**

| Méthode | Endpoint          | Description                    |
|---------|-------------------|--------------------------------|
| `GET`   | `/visites`        | Liste toutes les visites       |
| `POST`  | `/visites`        | Ajoute une nouvelle visite     |

---

## 🧪 Tests

Pour exécuter les tests :

```bash
npm test
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Créez une *issue* ou un *pull request* pour toute suggestion ou amélioration.

---

## 📜 Licence

Ce projet est sous licence **MIT**.
