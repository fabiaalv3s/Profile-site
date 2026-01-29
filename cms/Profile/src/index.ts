// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {
    // Log environment variables for debugging (sem valores sensíveis)
    if (process.env.NODE_ENV === 'production') {
      console.log('[Bootstrap] Environment check:')
      console.log('[Bootstrap] NODE_ENV:', process.env.NODE_ENV)
      console.log('[Bootstrap] DATABASE_CLIENT:', process.env.DATABASE_CLIENT)
      console.log('[Bootstrap] DATABASE_URL exists:', !!process.env.DATABASE_URL)
      console.log('[Bootstrap] DATABASE_SSL:', process.env.DATABASE_SSL)
      console.log('[Bootstrap] HOST:', process.env.HOST)
      console.log('[Bootstrap] PORT:', process.env.PORT)
      console.log('[Bootstrap] APP_KEYS exists:', !!process.env.APP_KEYS)
      console.log('[Bootstrap] APP_KEYS count:', process.env.APP_KEYS?.split(',').length || 0)
    }
  },
};
