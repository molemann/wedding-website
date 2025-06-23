// Environment configuration with safe fallbacks
export const config = {
  // RSVP Webhook URL - set this in your .env.local file
  // Format: INTEGROMAT_WEBHOOK_URL=https://hook.eu1.make.com/your-webhook-url-here
  webhookUrl: process.env.INTEGROMAT_WEBHOOK_URL || null,
  
  // Environment detection
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
}

// Debug logging
console.log('Environment config loaded:')
console.log('- NODE_ENV:', process.env.NODE_ENV)
console.log('- Webhook URL configured:', !!config.webhookUrl)
console.log('- Webhook URL:', config.webhookUrl)

// Helper function to check if webhook is configured
export const isWebhookConfigured = () => {
  return !!config.webhookUrl
}

// Helper function to get webhook URL safely
export const getWebhookUrl = () => {
  return config.webhookUrl
} 