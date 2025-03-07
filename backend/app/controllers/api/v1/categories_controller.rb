module Api
  module V1
    class CategoriesController < ApplicationController
      def index
        @categories = @current_user.categories

        render json: @categories
      end
    end
  end
end
