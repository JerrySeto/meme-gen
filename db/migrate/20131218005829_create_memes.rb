class CreateMemes < ActiveRecord::Migration
  def change
    create_table :memes do |t|
      t.string :top_text
      t.string :bottom_text

      t.timestamps
    end
  end
end
