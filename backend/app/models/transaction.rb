class Transaction < ApplicationRecord
  belongs_to :category
  belongs_to :payment_method
  belongs_to :user

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

  validates :title, presence: true
  validates :date, presence: true
  validates :amount, presence: true, numericality: true
  validates :currency, presence: true, inclusion: { in: CURRENCIES.keys }
  validate :category_belongs_to_user
  validate :payment_method_belongs_to_user

  scope :with_currency, ->(currency) { where(currency: currency) }
  scope :income, -> { where("amount > 0") }
  scope :expense, -> { where("amount < 0") }
  scope :this_month, -> { where(date: Time.current.beginning_of_month..Time.current.end_of_month) }
  scope :last_month, -> { where(date: 1.month.ago.beginning_of_month..1.month.ago.end_of_month) }
  scope :this_year, -> { where(date: Time.current.beginning_of_year..Time.current.end_of_year) }

  def currency_name
    CURRENCIES[currency]
  end

  def self.total_by_currency(currency)
    with_currency(currency).sum(:amount)
  end

  def self.total_by_category(start_date: nil, end_date: nil, currency: nil)
    scope = all
    scope = scope.where(date: start_date..end_date) if start_date && end_date
    scope = scope.where(currency: currency) if currency
    scope.group(:category_id)
         .joins(:category)
         .select("categories.name, SUM(amount) as total_amount")
         .order("total_amount DESC")
  end

  def self.total_by_payment_method(start_date: nil, end_date: nil, currency: nil)
    scope = all
    scope = scope.where(date: start_date..end_date) if start_date && end_date
    scope = scope.where(currency: currency) if currency
    scope.group(:payment_method_id)
         .joins(:payment_method)
         .select("payment_methods.name, SUM(amount) as total_amount")
         .order("total_amount DESC")
  end

  private

  def category_belongs_to_user
    return if category&.user_id == user_id
    errors.add(:category, "does not exist or does not belong to this user")
  end

  def payment_method_belongs_to_user
    return if payment_method&.user_id == user_id
    errors.add(:payment_method, "does not exist or does not belong to this user")
  end
end
