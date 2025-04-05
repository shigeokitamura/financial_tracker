module Api
  module V1
    class PaymentMethodsController < ApplicationController
      def index
        @payment_methods = @current_user.payment_methods

        render json: @payment_methods
      end
    end
  end
end
