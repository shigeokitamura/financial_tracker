class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :payment_methods, dependent: :destroy

  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :name, presence: true

  private

  def create_default_categories_and_payment_methods
    default_categories = [
      { name: "Food Expenses", description: "Groceries, eating out, beverages, etc." },
      { name: "Transportation Expenses", description: "Train, bus, cab, gasoline, etc." },
      { name: "Housing Expenses", description: "Rent, utilities, internet, etc." },
      { name: "Entertainment Expenses", description: "Hobbies, entertainment, travel, etc." },
      { name: "Medical Expenses", description: "Hospitals, medicine, health-related, etc." },
      { name: "Education Espenses", description: "Books, courses, tuition, etc." },
      { name: "Incomes", description: "Salary, bonuses, other income" }
    ]

    default_categories.each do |category|
      categories.create!(category)
    end

    default_payment_methods = [
      { name: "Cash", description: "Payment in cash" },
      { name: "Credit / Debit", description: "Payment by credit or debit card" },
      { name: "E-money", description: "Transportation cards, etc." },
      { name: "Bank Transfer", description: "Transfer from bank account" }
    ]

    default_payment_methods.each do |payment_method|
      payment_methods.create!(payment_method)
    end
  end
end
