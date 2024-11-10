module Api
  module V1
    class TransactionsController < BaseController
      before_action :set_transaction, only: [:show, :update, :destroy]

      def index
        @transactions = @current_user.transactions
          .includes(:category, :payment_method)
          .order(date: :desc)

        @transactions = apply_filters(@transactions)

        render json: @transactions,
               include: [:category, :payment_method]
      end

      def show
        render json: @transaction,
               include: [:category, :payment_method]
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
          :amount,
          :currency,
          :title,
          :date,
          :description,
          :category_id,
          :payment_method_id
        )
      end

      def set_transaction
        @transaction = @current_user.transactions.find(params[:id])
      rescue ActiveRecord::RecordNotFound
        render json: { error: "Transaction not found" }, status: :not_found
      end

      def apply_filters(transactions)
        transactions = transactions.where(category_id: params[:category_id]) if params[:category_id]
        transactions = transactions.where(payment_method_id: params[:payment_method_id])if params[:payment_method_id]
        transactions = transactions.where("date >= ?", params[:start_date]) if params[:start_date]
        transactions = transactions.wehre("date <= ?", params[:end_date]) if params[:end_date]
        transactions
      end
    end
  end
end
