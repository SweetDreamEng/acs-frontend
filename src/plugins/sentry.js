import Vue from 'vue'
import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'

Sentry.init({
  Vue,
  dsn: 'https://3b9791a8547949d89f696bffb6ab47ee@o500701.ingest.sentry.io/5580915',
  autoSessionTracking: true,
  integrations: [
    new Integrations.BrowserTracing()
  ],

  tracesSampleRate: 1.0,
  logErrors: true
})