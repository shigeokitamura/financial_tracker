FactoryBot.define do
  factory :user do
    email { "test@example.com" }
    name { "Test User" }
    provider { "guest" }
    uid { "" }
  end
end
