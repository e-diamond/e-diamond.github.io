module TagPages
    # Original from: https://jekyllrb.com/docs/plugins/generators/
    
    class TagPageGenerator < Jekyll::Generator
      safe true
  
      def generate(site)
        site.tags.each do |tag, posts|
          site.pages << TagPage.new(site, tag, posts, "blog")
        end

        site.config['bookmarks-tags'].each do |tag, posts|
          site.pages << TagPage.new(site, tag, posts, "bookmarks")
        end
      end
    end
  
    # Subclass of `Jekyll::Page` with custom method definitions.
    class TagPage < Jekyll::Page
      def initialize(site, tag, posts, dir)
        @site = site             # the current site instance.
        @base = site.source      # path to the source directory.
        @dir  = dir              # the directory the page will reside in.
  
        @basename = tag 
        @ext = '.html' 
        @name = @basename + @ext 
  
        # Add front matter 
        @data = {
          'title' => tag,
          'collection' => @dir,
          'tagged_posts' => posts
        }
  
        # Look up front matter defaults scoped to type `tagpages`, if given key
        # doesn't exist in the `data` hash.
        data.default_proc = proc do |_, key|
          site.frontmatter_defaults.find(relative_path, :tagpages, key)
        end
      end
  
      # Placeholders that are used in constructing page URL.
      def url_placeholders
        {
          :collection => @dir,
          :title => basename,
          :output_ext => output_ext,
        }
      end
    end
  end