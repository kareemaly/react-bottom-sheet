export function getWindowDimensions() {
  let w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      width = w.innerWidth || e.clientWidth || g.clientWidth,
      height = w.innerHeight|| e.clientHeight|| g.clientHeight;

  return {
    width,
    height,
  };
}

export function getWindowHeight() {
  return getWindowDimensions().height;
}

export function getWindowWidth() {
  return getWindowDimensions().width;
}
