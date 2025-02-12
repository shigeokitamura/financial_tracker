class ApplicationController < ActionController::API
  before_action :require_login

  private

  def require_login
    header = request.headers["Authorization"]
    header = header.split(" ").last if header

    begin
      @decoded = JWT.decode(header, ENV["JWT_SECRET_KEY"], true, { algorithm: "HS256" }).first
      if @decoded["provider"] == "guest"
        @current_user = User.find(@decoded["user_id"])
      else
        @current_user = User.find_by(uid: @decoded["google_user_id"], provider: @decoded["provider"])
      end
      Rails.logger.info(@current_user)
      unless @current_user
        raise ActiveRecord::RecordNotFound, "User not found"
      end
    rescue ActiveRecord::RecordNotFound, JWT::DecodeError => e
      Rails.logger.error "Authenticate Failed: #{e.message}"
      render json: { errors: e.message }, status: :unauthorized
    end
  end
end
