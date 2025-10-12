# hexo-filter-updated-from-git

A Hexo plugin that sets `post.updated` using the last Git commit time.

## Usage

```shell
npm install hexo-filter-updated-from-git --save
```

`_config.yml`:

```yml
# If no "updated" in front-matter, then leave post.updated undefined.
updated_option: 'empty'
```

You need to `hexo clean && hexo g` to run this filter on all posts.

## LICENSE

This project is licensed under the ISC License.
