class PaymentMethod < ApplicationRecord
  belongs_to :user
  has_many :transactions, dependent: :restrict_with_error

  validates :name, presence: true
  validates :name, uniqueness: { scope: :User_id,
                                 message: "is already used by this user" }
end
