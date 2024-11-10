class TransactionSerializer < ActiveModel::TransactionSerializer
  attributes :id, :amount, :currency, :title, :date, :description, :created_at

  belongs_to :category
  belongs_to :payment_method
end
