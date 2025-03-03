class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_many :categories, dependant: :destroy
  has_many :payment_methods, dependant: :destroy
end
