type Config = {
  blogTagPattern: string;
  imageSearchPaths: string[];
  postsPath: string;
  assetsUrl: string;
};

const config: Config = {
  blogTagPattern: '^(blog/solomonhawk/?)|(blog/?)',
  // XXX: this isn't great - is there a better way to find files that were
  // embedded in a bear post?
  imageSearchPaths: ['~/Downloads', '~/Documents', '~/Pictures'],
  postsPath: 'src/content/posts',
  assetsUrl: '/assets/images/posts',
};

export default config;
