/**
 * Serveur WazabyCode LMS
 * Sert index.html à la racine du projet + application LMS
 */
import express from 'express';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = join(__dirname, '..');
const PUBLIC = join(__dirname, 'public');
const COURS = join(PROJECT_ROOT, 'cours-cda');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/css', express.static(join(PUBLIC, 'css')));
app.use('/js', express.static(join(PUBLIC, 'js')));
app.use('/cours-cda', express.static(COURS));

/** Page d'accueil + guide utilisateur (racine du projet) */
app.get('/', (_req, res) => {
  res.sendFile(join(PROJECT_ROOT, 'index.html'));
});

/** Pages LMS (dashboard, module, certificat…) */
app.use(express.static(PUBLIC));

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', platform: 'WazabyCode', version: '1.0.0' });
});

const server = app.listen(PORT, () => {
  console.log(`\n🎓 WazabyCode — http://localhost:${PORT}`);
  console.log(`   Guide      : http://localhost:${PORT}/#guide`);
  console.log(`   Dashboard  : http://localhost:${PORT}/dashboard.html\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌ Le port ${PORT} est déjà utilisé.`);
    console.error(`   Arrêtez l'autre instance : lsof -ti :${PORT} | xargs kill -9`);
    console.error(`   Ou utilisez un autre port : PORT=3001 npm start\n`);
    process.exit(1);
  }
  throw err;
});
