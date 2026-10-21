export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  
  const healthData = {
    status: 'healthy',
    service: 'Pondok Pesantren Jauharul Maknuun Web Portal',
    timestamp: new Date().toISOString(),
    uptime: process.uptime ? `${Math.floor(process.uptime())}s` : 'active',
    environment: process.env.NODE_ENV || 'production',
    region: process.env.VERCEL_REGION || 'global',
    version: '1.2.0'
  };

  res.status(200).json(healthData);
}
