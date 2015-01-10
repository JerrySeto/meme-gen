class MemesController < ApplicationController
  def landing
  end

  def index
    @memes = Meme.all.map do |meme| 
      meme.attributes_for_json
    end
  end

  def update
    @meme = Meme.find(params[:id])
    @meme.update_attributes(meme_params)
    render :show
  end

  def create
    @meme = Meme.create(meme_params)
    render :show
  end

  def show
    @meme = Meme.find(params[:id]).attributes_for_json
    render :show
  end

  def meme_params
    params.permit(:top_text, :bottom_text ,:image, :meme_template_name)
  end
end
