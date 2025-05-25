class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :payment_method

  validates :name, presence: true
  validates :date, presence: true
  validates :amount, presence: true, numericality: true
  validates :currency, presence: true, inclusion: { in: CurrencyHistory::CURRENCIES }

  attribute :amount, :float
end
