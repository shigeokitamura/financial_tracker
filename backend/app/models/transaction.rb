class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :category
  belongs_to :payment_method

  validates :name, presence: true
  validates :date, presence: true
  validates :amount, presence: true, numericality: true
  validates :currency, presence: true, inclusion: { in: CurrencyHistory::CURRENCIES }

  attribute :amount, :float

  def in_usd
    return amount if currency == "USD"

    value = CurrencyHistory.find_by(currency: currency, date: date).value

    value.nil? ? nil : (amount / value)
  end
end
