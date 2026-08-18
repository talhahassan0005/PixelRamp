/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.pixel-ramp.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/admin/*', '/auth', '/dashboard', '/dashboard/*', '/projects/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/auth', '/dashboard', '/dashboard/*', '/projects/*', '/api/*'],
      },
    ],
  },
};
