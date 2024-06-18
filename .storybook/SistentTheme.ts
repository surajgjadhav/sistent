import { create } from '@storybook/theming/create';
const SistentLogo = require('./logo.svg') as string;

export default create({
  base: 'light',
  brandTitle: 'Sistent Design System',
  brandUrl: 'https://github.com/layer5io/sistent',
  brandImage: SistentLogo,
  brandTarget: '_self'
});
