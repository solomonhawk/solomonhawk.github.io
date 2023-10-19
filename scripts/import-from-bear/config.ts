type Config = {
  blogTagPattern: string;
  imageSearchPaths: string[];
  defaultLayout: string;
  postsPath: string;
  assetsUrl: string;
};

const config: Config = {
  blogTagPattern: '^(blog/solomonhawk/?)|(blog/?)',
  // XXX: this isn't great - is there a better way to find files that were
  // embedded in a bear post?
  imageSearchPaths: ['~/Downloads', '~/Documents', '~/Pictures'],
  defaultLayout: '@layouts/BlogPost.astro',
  postsPath: 'src/pages/writing/posts',
  assetsUrl: '/assets/images/posts',
};

export default config;
