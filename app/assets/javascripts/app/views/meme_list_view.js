App.Views.MemeListView = Backbone.View.extend({
  template: Handlebars.compile($('#meme-list-template').html()),
  events:{
    'click .filter li': 'filterHandler'
  },
  initialize: function(options, filter){
    this.filterName = filter;
    _(this).bindAll('render', 'addViews', 'doFilter')
    this.collection = new App.Collections.Memes();
    this.memeViews = [];
    this.listenTo(this.collection, 'reset', this.addViews);
    this.collection.fetch({reset:true})
  },
  render: function(){
    this.$el.empty();
    this.$el.append(this.template());
    this.$el.find('.selected').removeClass('selected')
    this.$el.find('[data-template-name=' + this.filterName + ']').addClass('selected')
    var memeList = this.$el.find('#memeList');
    for(var i=0, l=this.memeViews.length; i < l; i++){
      memeList.append(this.memeViews[i].el);
    }
    if(this.filterName){
      this.doFilter();
    }
    return this;
  },
  clearSubViews: function(){
    _.each(this.memeViews, function(memeView){
      memeView.close();
    })
  },
  onClose: function(){
    this.clearSubViews();
  },
  addViews: function(collection){
    collection.each(function(meme){
      var newMemeView = new App.Views.MemeItemView({
        model: meme
      });
      this.memeViews.push(newMemeView);
      newMemeView.render();
    }, this)
    this.render();
  },
  filterHandler: function(e){
    this.$el.find('.selected').removeClass('selected')
    $(e.target).addClass('selected')
    this.filterName = e.target.dataset.templateName;
    Backbone.history.navigate(this.filterName)
    this.doFilter();
  },
  doFilter: function(){
    this.collection.each(function(model){
      model.trigger('filter', this.filterName)
    }, this)
  }
})