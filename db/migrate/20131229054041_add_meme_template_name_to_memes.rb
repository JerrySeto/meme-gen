class AddMemeTemplateNameToMemes < ActiveRecord::Migration
  def change
    add_column :memes, :meme_template_name, :string
  end
end
