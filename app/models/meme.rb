class Meme < ActiveRecord::Base
  has_attached_file :image, :styles => { :medium => "300x300>", :thumb => "100x100>" }  

  def attributes_for_json
    self.slice(:top_text, :bottom_text, :id, :meme_template_name).merge(:image => image.url, :image_thumb => image.url(:thumb))
  end
end
