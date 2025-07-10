module CollectionTags

  class TagsVariableGenerator < Jekyll::Generator

    def generate(site)
      # object to output to site namespace 
      tags = {}
      # loop through each post in collection 
      site.collections['bookmarks'].docs.each do |post|
        post.data['tags'].each do |tag|
          # initialise tags as empty array 
          if tags[tag] == nil
            tags[tag] = []
          end
          # append post to relevant tag array 
          tags[tag] << post
        end
      end

      # sort tags by number of posts
      tags = tags.sort_by{ |tag, posts| -posts.length }.to_h

      # output to config 
      site.config['bookmarks-tags'] = tags
      # site.config['collections']['bookmarks']['tags'] = tags
      # puts site.config['collections']['bookmarks']['tags']
      # site.config['bookmarks[\'tags\']'] = tags
    end
  end

end