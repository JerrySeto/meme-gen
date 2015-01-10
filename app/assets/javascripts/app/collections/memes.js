App.Collections.Memes = Backbone.Collection.extend({
  model: App.Models.Meme,
  url: '/memes'
})