class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :payment_method

  CURRENCIES = {
    "AUD" => "Australian Dollar",
    "CAD" => "Canadian Dollar",
    "CNY" => "Chinese Renminbi",
    "EUR" => "Euro",
    "GBP" => "British Pound",
    "HKD" => "Hong Kong Dollar",
    "INR" => "Indian Rupee",
    "JPY" => "Japanese Yen",
    "KRW" => "Korean Won",
    "TWD" => "Taiwan Dollar",
    "USD" => "US Dollar",
  }

  validates :name, presence: true
  validates :date, presence: true
  validates :amount, presence: true, numericality: true
  validates :currency, presence: true, inclusion: { in: CURRENCIES.keys }

  attribute :amount, :float
end
