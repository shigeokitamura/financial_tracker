class User < ApplicationRecord
  has_many :transactions, dependent: :destroy
  has_many :categories, dependant: :destroy
end
