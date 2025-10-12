const { execSync } = require('child_process');
const path = require('path');

module.exports = function (hexo) {
  hexo.log.info('233333');
  console.log(2333)
  hexo.extend.filter.register('before_post_render', function (post) {
    hexo.log.info('test test test')
    console.log(1)
    if (post.updated !== undefined) {
      return post;
    }

    try {
      const fullPath = path.join(hexo.source_dir, post.source);
      console.log(fullPath)
      // Get the last author date in ISO 8601 format
      const gitTime = execSync(
        `git log -1 --format=%aI -- "${fullPath}"`,
        // Return a string instead of a buffer
        { encoding: 'utf8' }
      ).trim();
      console.log(gitTime)

      if (gitTime) {
        post.updated = new Date(gitTime);
      }
    } catch (err) {
      // Likely to be untracked. Leave post.updated undefined
      console.log(err)
    }

    return post;
  });
}
