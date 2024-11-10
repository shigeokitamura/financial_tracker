module Api
  module V1
    class PaymentMethodsController < BaseController
      before_action :set_payment_method, only: [:show, :update, :destroy]

      def index
        @payment_methods = @current_user.payment_methods
        render json: @payment_methods
      end

      def show
        render json: @payment_method
      end

      def create
        @payment_method = @current_user.payment_method.build(payment_method_params)
        if @payment_method.save
          render json: @payment_method
        else
          render json: { errors: @payment_method.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @payment_method.update(payment_method_params)
          render json: @payment_method
        else
          render json: { errors: @payment_method.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @payment_method.destroy
        head :no_content
      end

      private

      def payment_method_params
        params.require(:payment_method).permit(:name, :description)
      end

      def set_payment_method
        @payment_method = @current_user.payment_methods.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Payment method not found" }, status: :not_found
      end
    end
  end
end
