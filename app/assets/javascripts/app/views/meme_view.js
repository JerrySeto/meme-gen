App.Views.MemeView = Backbone.View.extend({
  template: Handlebars.compile($('#meme-edit-template').html()),
  memeNameHash: {
    xzibit: $('.meme-template')[0],
    boromir: $('.meme-template')[1],
    morpheus: $('.meme-template')[2]
  },
  formTemplate: Handlebars.compile($('#meme-edit-form-template').html()),
  events: {
    'input #top-text': 'updateTopText',
    'input #bottom-text': 'updateBottomText',
    'change input[type=radio]': 'updateTemplate',
    'click #submit': 'submitHandler'
  },
  initialize: function(){
    this.model = this.model || new App.Models.Meme();
    this.memeCanvas = new MemeCanvas();
    this.listenTo(this.model, 'change', this.updateCanvas)
  },
  updateCanvas:function(){
    this.memeCanvas.setTopText(this.model.get('top_text'))
    this.memeCanvas.setBottomText(this.model.get('bottom_text'))
    this.renderMemeTemplate()
  },
  render: function(){
    this.$el.empty();
    this.$el.append(this.template())
    this.renderFormTemplate();
    this.renderMemeTemplate();
    return this;
  },
  renderMemeTemplate: function(){
    var region = this.$el.find('#template-img');
    var images = region.find('img')
    var image;
    if(images.length > 0){
      image = images[0]
    }else{
      image = document.createElement('img')
      region.append(image);
    }
    this.memeCanvas.template = this.memeNameHash[this.model.get('meme_template_name')]
    this.memeCanvas.setTopText(this.model.get('top_text'))
    this.memeCanvas.setBottomText(this.model.get('bottom_text'))
    image.src = this.memeCanvas.getDataURL();
  },
  renderFormTemplate: function(){
    var region = this.$el.find('#edit-form');
    region.empty();
    region.append(this.formTemplate(this.templateInfo()));
  },
  updateTemplate: function(e){
    this.model.set('meme_template_name', e.target.id);
  },
  submitHandler: function(e){
    e.preventDefault()
    this.model.set('image',this.memeCanvas.getDataURL() )
    var self = this;
    Pace.track(function(){
      self.model.save();  
    })
  },
  updateTopText: function(e){
    this.model.set('top_text', e.target.value)
  },
  updateBottomText: function(e){
    this.model.set('bottom_text', e.target.value)
  },
  templateInfo: function(){
    return {
      xzibit: this.model.get('meme_template_name') === 'xzibit',
      morpheus: this.model.get('meme_template_name') === 'morpheus',
      boromir: this.model.get('meme_template_name') === 'boromir',
      model: this.model.toJSON(),
    };
  }
})