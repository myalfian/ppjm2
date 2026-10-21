import { Loader } from "@googlemaps/js-api-loader";

const apiKey = (typeof window !== 'undefined' && window.__ENV__ && window.__ENV__.GOOGLE_MAPS_API_KEY)
  ? window.__ENV__.GOOGLE_MAPS_API_KEY
  : ((typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_GOOGLE_MAPS_API_KEY) ? import.meta.env.VITE_GOOGLE_MAPS_API_KEY : '');

function renderFallbackMap(mapElement) {
  if (!mapElement) return;
  mapElement.innerHTML = `
    <div class="relative w-full h-full min-h-[320px]">
      <iframe 
        width="100%" 
        height="100%" 
        style="border:0; min-height: 320px; border-radius: 1rem;" 
        loading="lazy" 
        allowfullscreen 
        referrerpolicy="no-referrer-when-downgrade" 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15849.524672621008!2d111.44!3d-6.7085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e772f4405a8b7c5%3A0x4027a76e3531b40!2sLasem%2C%20Rembang%20Regency%2C%20Central%20Java!5e0!3m2!1sen!2sid!4v1700000000000">
      </iframe>
      <div class="absolute bottom-3 left-3 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-bold text-primary shadow-md flex items-center gap-2">
        <i class="fa-solid fa-location-dot text-rose-600"></i>
        <span>Pondok Pesantren Jauharul Maknuun</span>
      </div>
    </div>
  `;
}

async function initMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  if (!apiKey) {
    renderFallbackMap(mapElement);
    return;
  }

  try {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
      libraries: ["places", "marker"]
    });

    const { Map } = await loader.importLibrary("maps");
    const { AdvancedMarkerElement } = await loader.importLibrary("marker");
    
    const position = { lat: -6.7085, lng: 111.6495 }; // Lasem, Rembang
    
    const map = new Map(mapElement, {
      center: position,
      zoom: 16,
      mapId: "DEMO_MAP_ID",
      internalUsageAttributionIds: ['gmp_mcp_codeassist_v1_aistudio']
    });

    const locations = [
      { lat: -6.7085, lng: 111.6495, title: "Pondok Pesantren Jauharul Maknuun" },
      { lat: -6.7080, lng: 111.6490, title: "Kantor Administrasi" },
      { lat: -6.7090, lng: 111.6500, title: "Asrama Putra" },
      { lat: -6.7095, lng: 111.6490, title: "Asrama Putri" },
      { lat: -6.7075, lng: 111.6505, title: "Gedung Sekolah SMP Plus" }
    ];

    locations.forEach(loc => {
      const marker = new AdvancedMarkerElement({
        map,
        position: { lat: loc.lat, lng: loc.lng },
        title: loc.title
      });

      marker.addListener('click', async () => {
        const { InfoWindow } = await loader.importLibrary("maps");
        const infoWindow = new InfoWindow({
          content: `
            <div style="padding: 5px;">
              <h4 style="font-weight: bold; margin-bottom: 5px; color: #1a6b3c;">${loc.title}</h4>
              <p style="font-size: 11px; color: #555; margin-bottom: 6px;">Jl. Raya Dukun-Lasem RT 1 RW 1, Lasem Sidayu Gresik, Gresik 61153</p>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}" 
                 target="_blank" 
                 rel="noopener noreferrer"
                 style="display: inline-block; background-color: #1a6b3c; color: white; padding: 4px 10px; text-decoration: none; border-radius: 6px; font-size: 11px; font-weight: bold;">
                 Buka Petunjuk Arah
              </a>
            </div>
          `
        });
        infoWindow.open(map, marker);
      });
    });
  } catch (err) {
    console.warn('[PPJM] Google Maps loader error, falling back to embedded map:', err);
    renderFallbackMap(mapElement);
  }
}

function setupLazyMap() {
  const mapElement = document.getElementById("map");
  if (!mapElement) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          obs.disconnect();
          initMap();
        }
      });
    }, { rootMargin: '200px 0px' });
    observer.observe(mapElement);
  } else {
    initMap();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener("DOMContentLoaded", setupLazyMap);
} else {
  setupLazyMap();
}
