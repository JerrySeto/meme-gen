App.Models.Meme = Backbone.Model.extend({
  defaults: {
    top_text: '',
    bottom_text: '',
    image: '',
    meme_template_name: 'xzibit'
  },
  url: function(){
    if(this.isNew()){
      return '/memes';
    }else{
      return '/memes/' + this.id;
    }
  }
})