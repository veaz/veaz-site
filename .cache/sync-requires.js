const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-layout-post-layout-js": hot(preferDefault(require("C:\\Users\\Victor\\Documents\\Proyectos\\veaz.me\\gatsbysite\\src\\layout\\PostLayout.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("C:\\Users\\Victor\\Documents\\Proyectos\\veaz.me\\gatsbysite\\.cache\\dev-404-page.js"))),
  "component---src-pages-404-js": hot(preferDefault(require("C:\\Users\\Victor\\Documents\\Proyectos\\veaz.me\\gatsbysite\\src\\pages\\404.js"))),
  "component---src-pages-blog-js": hot(preferDefault(require("C:\\Users\\Victor\\Documents\\Proyectos\\veaz.me\\gatsbysite\\src\\pages\\blog.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\Users\\Victor\\Documents\\Proyectos\\veaz.me\\gatsbysite\\src\\pages\\index.js")))
}

