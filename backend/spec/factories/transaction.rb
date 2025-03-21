FactoryBot.define do
  factory :transaction do
    name { "Test Transaction" }
    date { "2022-01-01" }
    amount { 100 }
    currency { "USD" }
    description { "Test description" }
  end
end
