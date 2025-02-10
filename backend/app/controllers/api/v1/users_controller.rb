class Api::V1::UsersController < ApplicationController
  skip_before_action :require_login, only: [:index, :show]

  def index; end
  def show; end
  def update; end
  def destroy; end
  
  def current_user
    if @current_user
      render json: { user: @current_user }
    else
      render json: { error: "Authenticate Required" }, status: :unauthorized
    end
  end
end
