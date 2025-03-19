class AddPaymentMethodIdAndCategoryIdToTransactions < ActiveRecord::Migration[7.2]
  def change
    add_reference :transactions, :payment_method, null: false, foreign_key: true
    add_reference :transactions, :category, null: false, foreign_key: true
  end
end
