class SessionsController < ApplicationController
  skip_before_action :require_login, only: [:create]

  def create
    frontend_url = ENV["FRONTEND_URL"]
    user_info = request.env["omniauth.auth"]
    google_user_id = user_info["uid"]
    google_user_email = user_info["info"]["email"]
    provider = user_info["provider"]
    token = generate_token_with_google_user_id(google_user_id, provider)

    user = User.find_by(uid: google_user_id, provider: provider)

    if user
      Rails.logger.info("User Found")
      redirect_to "#{frontend_url}/transactions?token=#{token}", allow_other_host: true
    else
      Rails.logger.info("User Not Found")
      user = User.create(email: google_user_email, name: google_user_email, provider: provider, uid: google_user_id)
      redirect_to "#{frontend_url}/transactions?token=#{token}", allow_other_host: true
    end
  end

  private

  def generate_token_with_google_user_id(google_user_id, provider)
    exp = Time.now.to_i + 24 * 3600
    payload = { google_user_id: google_user_id, provider: provider, exp: exp }
    hmac_secret = ENV["JWT_SECRET_KEY"]
    JWT.encode(payload, hmac_secret, "HS256")
  end
end
