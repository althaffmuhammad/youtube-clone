export const API_KEY = 'AIzaSyCR - tX_CaacYabCgMHbs4olzsp8S7a0x9o';

export const value_converter = value => {
  if (value >= 1000000) {
    return Math.floor (value / 1000000) + 'M';
  } else if (value >= 1000) {
    return Math.floor (value / 1000) + 'K';
  } else {
    return value;
  }
};
