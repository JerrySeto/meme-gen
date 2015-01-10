function MemeCanvas(){
  this.canvas = document.createElement('canvas');
  this.ctx = this.canvas.getContext('2d');  
}

MemeCanvas.prototype.setTopText = function(topText){
  this.topText = topText;
}
MemeCanvas.prototype.setBottomText = function(bottomText){
  this.bottomText = bottomText;
}
MemeCanvas.prototype.getDataURL = function() {
  this.canvas.height = this.template.height
  this.canvas.width = this.template.width
  this.ctx.textAlign = 'center'
  this.ctx.font = '40px Impact'
  this.ctx.fillStyle = 'white'
  this.ctx.drawImage(this.template, 0, 0, this.canvas.width, this.canvas.height)
  if(this.topText){
    this.ctx.fillText(this.topText, this.canvas.width / 2, 64);  
  }
  if(this.bottomText){
    this.ctx.fillText(this.bottomText, this.canvas.width / 2, this.canvas.height - 64)
  }
  return this.canvas.toDataURL();
};