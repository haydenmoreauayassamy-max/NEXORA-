NEXORA AI — Backend Railway

FICHIERS À PLACER À LA RACINE DU DÉPÔT GITHUB
- package.json
- server.js
- .env.example
- README_RAILWAY.txt

DÉPLOIEMENT
1. Connecter le dépôt GitHub au service Railway.
2. Railway détecte package.json et lance automatiquement : npm start
3. Dans Railway > Variables, ajouter OPENAI_API_KEY avec une clé API obtenue et configurée avec l'aide d'un adulte.
4. Facultatif : définir OPENAI_MODEL selon le modèle disponible sur le compte.

Ne jamais publier une vraie clé API dans GitHub.
Le backend expose GET /, GET /api/health et POST /api/chat.
PostgreSQL n'est pas encore utilisé par cette version.
