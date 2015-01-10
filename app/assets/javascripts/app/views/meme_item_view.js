App.Views.MemeItemView = Backbone.View.extend({
  tagName: 'span',
  template: Handlebars.compile($('#meme-item-template').html()),
  events:{
    'click img' : 'showImage'
  },
  initialize: function(){
    _(this).bindAll('adjustVisibility')
    this.listenTo(this.model, 'filter', this.adjustVisibility)
  },
  render: function(){
    this.$el.empty();
    this.$el.append(this.template(this.model.toJSON()));
    return this;
  },
  showImage: function(){
    Backbone.history.navigate('/meme/' + this.model.id, {trigger: true})
  },
  adjustVisibility: function(filterName){
    this.$el.toggle(this.model.get('meme_template_name') === filterName || filterName === 'all');
  }
})