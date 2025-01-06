class ApplicationController < ActionController::API
  include SessionsHelper
  before_action :require_login

  def require_login
    return if current_user

    render json: { error: "Authenticate Required" }, status: :unauthorized
  end
end
