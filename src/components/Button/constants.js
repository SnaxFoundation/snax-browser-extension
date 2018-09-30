import Color from 'color';
import constants from '../../styles/style-constants';

export default {
  primary: {
    bgColor: constants.color.primary,
    bgColorHover: Color(constants.color.primary).darken(0.1),
    color: '#fff',
  },

  secondary: {
    bgColor: constants.color.secondary,
    bgColorHover: Color(constants.color.secondary).darken(0.1),
    color: '#fff',
  },

  flat: {
    bgColor: 'rgba(0,0,0,0)',
    bgColorHover: 'rgba(0,0,0,0.1)',
    color: '#000',
  },
};
