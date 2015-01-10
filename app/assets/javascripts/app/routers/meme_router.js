App.Routers.MemeRouter = Backbone.Router.extend({
  routes:{
    'meme/create(/:optional)': 'create',
    'meme/:id': 'show',
    '*filter': 'browse'
  },
  initialize: function(){
  },
  browse: function(filter){
    console.log('browse route', filter)
    this._showView(new App.Views.MemeListView({}, filter))
  },
  show: function(id){
    console.log('show route', id)
    var self = this;
    var model = new App.Models.Meme({id: id})
    model.fetch().then(function(){
      self._showView(new App.Views.MemeView({model: model}))      
    })
  },
  create: function(optionalPart){
    console.log('create route', optionalPart)
    this._showView(new App.Views.MemeView())
  },
  _showView: function(view){
    if(this.currentView){
      this.currentView.close();
    }
    this.currentView = view;
    view.render();
    $('#content').append(view.el);
  }
})