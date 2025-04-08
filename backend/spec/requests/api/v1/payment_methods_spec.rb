require "swagger_helper"

RSpec.describe "api/v1/payment_methods", type: :request do
  let(:user) { create(:user) }
  let(:token) { JWT.encode({ user_id: user.id, provider: "guest" }, ENV["JWT_SECRET_KEY"], "HS256") }

  path "/api/v1/payment_methods" do
    get("list payment methods") do
      tags "Payment Methods"
      description "Get all payment methods"
      produces "application/json"
      parameter name: "Authorization", in: :header, type: :string, required: true

      response(200, "ok") do
        let(:Authorization) { "Bearer #{token}" }

        schema type: :array,
          items: {
            type: :object,
            properties: {
              id: { type: :integer },
              user_id: { type: :integer },
              name: { type: :string },
              created_at: { type: :string },
              updated_at: { type: :string }
            }
          }

        run_test!
      end

      response(401, "unauthorized") do
        let(:Authorization) { "Bearer invalid_token" }

        run_test!
      end
    end
  end
end
