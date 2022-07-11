import { render } from '@/lib/mact';

import App from './app';

import './styles/reset.css';
import './styles/index.css';

render(new App({}), document.getElementById('root') as HTMLElement);
