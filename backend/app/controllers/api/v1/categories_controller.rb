module Api
  module V1
    class CategoriesController < BaseController
      before_action :set_category, only: [:show, :update, :destroy]

      def index
        @categories = @current_user.categories
        render json: @categories
      end

      def show
        render json: @category
      end

      def create
        @category = @current_user.categories.build(category_params)
        if @category.save
          render json: @category
        else
          render json: { errors: @category.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @category.update(category_params)
          render json: @category
        else
          render json: { errors: @category.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @category.destroy
        head :no_content
      end

      private

      def category_params
        params.require(:category).permit(:name, :description)
      end

      def set_category
        @category = @current_user.categories.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Category not found" }, status: :not_found
      end
    end
  end
end
