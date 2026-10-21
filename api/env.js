export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/javascript');
  res.setHeader('Cache-Control', 'no-store');
  const supabaseUrl = (process.env.SUPABASE_URL || '').replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '');
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || '';
  const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY || '';
  res.status(200).send(
    `window.__ENV__ = { SUPABASE_URL: ${JSON.stringify(supabaseUrl)}, SUPABASE_ANON_KEY: ${JSON.stringify(supabaseAnonKey)}, GOOGLE_MAPS_API_KEY: ${JSON.stringify(googleMapsApiKey)} };`
  );
}

