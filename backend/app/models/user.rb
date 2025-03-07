class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :payment_methods, dependent: :destroy

  validates :email, presence: true, uniqueness: true,
            format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :name, presence: true
end
