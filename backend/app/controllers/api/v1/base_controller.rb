module Api
  module V1
    class BaseController < ApplicationController
      before_action :authenticate_user

      private

      def authenticate_user
        # TODO: implement authenticate
        @current_user = User.find_by(email: "test@example.com")
      end
    end
  end
end
