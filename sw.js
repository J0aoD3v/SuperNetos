/**
 * Service Worker para SuperNetos PWA
 * Permite que o app funcione offline e seja instalável
 */

const CACHE_NAME = 'supernetos-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/src/estilos/global.css',
  '/src/estilos/pagina-inicial.css',
  '/src/scripts/globals.js',
  '/src/scripts/audio-manager.js',
  '/src/scripts/volume-control.js',
  '/src/paginas/selecao-personagem.html',
  '/src/paginas/perguntas-dinamicas.html',
  '/src/paginas/perguntas-dinamicas-servidor.html',
  '/src/paginas/resultados.html',
  '/src/paginas/figurinhas.html',
  '/src/recursos/audio/Heroic.mp3',
  '/src/recursos/imagens/interface/background.jpg',
  '/src/recursos/imagens/interface/placa_supernetos.png',
  '/src/recursos/imagens/interface/botao_iniciar.png',
  '/src/recursos/imagens/interface/selection_background.jpg',
  '/src/recursos/imagens/personagens/menino_normal.png',
  '/src/recursos/imagens/personagens/menina_normal.png',
  '/src/recursos/imagens/personagens/menino_feliz.png',
  '/src/recursos/imagens/personagens/menina_feliz.png',
  '/src/recursos/imagens/personagens/menino_triste.png',
  '/src/recursos/imagens/personagens/menina_triste.png'
];

// Instalação do Service Worker - cacheia os arquivos
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[Service Worker] Cache aberto');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('[Service Worker] Todos os arquivos foram cacheados');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('[Service Worker] Erro ao cachear:', error);
      })
  );
});

// Ativação do Service Worker - limpa caches antigos
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deletando cache antigo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('[Service Worker] Ativado com sucesso');
      return self.clients.claim();
    })
  );
});

// Intercepta requisições - estratégia Cache First com Network Fallback
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Retorna do cache se encontrado
        if (response) {
          console.log('[Service Worker] Carregando do cache:', event.request.url);
          return response;
        }

        // Se não estiver no cache, busca da rede
        console.log('[Service Worker] Buscando da rede:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Verifica se é uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta para cachear
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('[Service Worker] Erro ao buscar da rede:', error);
            
            // Se falhar, tenta retornar página offline (se disponível)
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
          });
      })
  );
});

// Listener para mensagens do cliente
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.delete(CACHE_NAME).then(() => {
      console.log('[Service Worker] Cache limpo manualmente');
    });
  }
});

// Sincronização em background (para futuras features)
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-game-data') {
    event.waitUntil(syncGameData());
  }
});

async function syncGameData() {
  console.log('[Service Worker] Sincronizando dados do jogo...');
  // Implementação futura para sincronizar progresso do jogador
}

console.log('[Service Worker] Script carregado');
