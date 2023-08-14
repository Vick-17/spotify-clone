// Ce code optionnel est utilisé pour enregistrer un service worker.
// La fonction register() n'est pas appelée par défaut.

// Cela permet à l'application de se charger plus rapidement lors de visites ultérieures en production et lui confère
// des capacités hors ligne. Cependant, cela signifie également que les développeurs (et les utilisateurs)
// ne verront les mises à jour déployées que lors de visites ultérieures sur une page, après que tous les onglets
// ouverts sur la page aient été fermés, car les ressources précédemment mises en cache sont mises à jour en arrière-plan.

// Pour en savoir plus sur les avantages de ce modèle et obtenir des instructions pour l'activation, consultez https://bit.ly/CRA-PWA

const isLocalhost = Boolean(
  window.location.hostname === "localhost" ||
    // [::1] est l'adresse IPv6 localhost.
    window.location.hostname === "[::1]" ||
    // 127.0.0.0/8 est considéré comme localhost pour IPv4.
    window.location.hostname.match(
      /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);

export function register(config) {
  if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
    // Le constructeur URL est disponible dans tous les navigateurs prenant en charge les SW.
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      // Notre service worker ne fonctionnera pas si PUBLIC_URL est sur une origine différente
      // de celle de notre page. Cela pourrait se produire si un CDN est utilisé pour
      // servir les ressources ; voir https://github.com/facebook/create-react-app/issues/2374
      return;
    }

    window.addEventListener("load", () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        // Ceci s'exécute sur localhost. Vérifions si un service worker existe toujours ou non.
        checkValidServiceWorker(swUrl, config);

        // Ajout de quelques journaux supplémentaires sur localhost, renvoyant les développeurs vers la
        // documentation sur les service workers/PWA.
        navigator.serviceWorker.ready.then(() => {
          console.log(
            "Cette application web est servie en premier cache par un service " +
              "worker. Pour en savoir plus, consultez https://bit.ly/CRA-PWA"
          );
        });
      } else {
        // Ce n'est pas localhost. Enregistrons simplement le service worker.
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === "installed") {
            if (navigator.serviceWorker.controller) {
              // À ce stade, le contenu précaché mis à jour a été récupéré,
              // mais l'ancien service worker continuera à servir l'ancien
              // contenu jusqu'à ce que tous les onglets clients soient fermés.
              console.log(
                "Un nouveau contenu est disponible et sera utilisé lorsque tous " +
                  "les onglets de cette page seront fermés. Voir https://bit.ly/CRA-PWA."
              );

              // Exécute le rappel
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              // À ce stade, tout a été précaché.
              // C'est le moment idéal pour afficher un message
              // "Le contenu est mis en cache pour une utilisation hors ligne."
              console.log(
                "Le contenu est mis en cache pour une utilisation hors ligne."
              );

              // Exécute le rappel
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'enregistrement du service worker :",
        error
      );
    });
}

function checkValidServiceWorker(swUrl, config) {
  // Vérifie si le service worker peut être trouvé. S'il ne peut pas l'être, rechargez la page.
  fetch(swUrl, {
    headers: { "Service-Worker": "script" },
  })
    .then((response) => {
      // Assurez-vous que le service worker existe et que nous obtenons vraiment un fichier JS.
      const contentType = response.headers.get("content-type");
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf("javascript") === -1)
      ) {
        // Aucun service worker trouvé. Probablement une application différente. Rechargez la page.
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        // Service worker trouvé. Procédez normalement.
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        "Aucune connexion Internet trouvée. L'application fonctionne en mode hors ligne."
      );
    });
}

export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}
