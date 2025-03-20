module Api
  module V1
    class TransactionsController < ApplicationController
      before_action :set_transaction, only: %i[show update destroy]

      def index
        @transactions = @current_user.transactions
          .order(date: :desc)

        render json: @transactions
      end

      def show
        render json: @transaction,
               include: %i[category payment_method]
      end

      def create
        @transaction = @current_user.transactions.build(transaction_params)
        if @transaction.save
          render json: @transaction, status: :created
        else
          render json: { errors: @transaction.errors }, status: :unprocessable_entity
        end
      end

      def update
        if @transaction.update(transaction_params)
          render json: @transaction
        else
          render json: { errors: @transaction.errors }, status: :unprocessable_entity
        end
      end

      def destroy
        @transaction.destroy
        head :no_content
      end

      private

      def transaction_params
        params.require(:transaction).permit(
          :name,
          :date,
          :amount,
          :currency,
          :description,
          :category_id,
          :payment_method_id,
        )
      end

      def set_transaction
        @transaction = @current_user.transactions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Transaction not found" }, status: :not_found
      end
    end
  end
end
