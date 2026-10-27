import { renderToString } from 'react-dom/server';
import { buildRoutes, notFoundRoute } from './routes';
import { site } from './config/site';
import { projects } from './content/projects';

export function render() {
  const routes = buildRoutes().map((r) => ({ ...r, html: renderToString(r.render()) }));
  const nf = notFoundRoute('en');
  return { routes, notFound: { ...nf, html: renderToString(nf.render()) }, site, projects };
}
