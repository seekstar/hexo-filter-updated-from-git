const { execFileSync } = require('child_process');
const path = require('path');

hexo.extend.filter.register('before_post_render', function (post) {
  if (post.updated !== undefined) {
    return post;
  }

  try {
    const fullPath = path.join(hexo.source_dir, post.source);
    // Get the last author date in ISO 8601 format
    const gitTime = execFileSync(
      'git',
      // --literal-pathspecs: file names may contain git pathspec magic (*, ?, [)
      ['--literal-pathspecs', 'log', '-1', '--format=%aI', '--', fullPath],
      // Return a string instead of a buffer
      { encoding: 'utf8' }
    ).trim();

    if (gitTime) {
      post.updated = new Date(gitTime);
    }
  } catch (err) {
    // Likely to be untracked. Leave post.updated undefined
    hexo.log.debug(err)
  }

  return post;
});
