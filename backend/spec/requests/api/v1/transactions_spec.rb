require "swagger_helper"

RSpec.describe "api/v1/transactions", type: :request do

  let(:user) { create(:user) }
  let(:token) { JWT.encode({ user_id: user.id, provider: "guest" }, ENV["JWT_SECRET_KEY"], "HS256") }

  path "/api/v1/transactions" do
    get("list transactions") do
      tags "Transactions"
      description "Get all transactions"
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
              date: { type: :string },
              amount: { type: :number },
              currency: { type: :string },
              description: { type: :string },
              created_at: { type: :string },
              updated_at: { type: :string },
              payment_method_id: { type: :integer },
              category_id: { type: :integer },
            }
          }

        before do
          create_list(:transaction, 3, user: user, category: user.categories.sample, payment_method: user.payment_methods.sample)
        end

        run_test!
      end

      response(401, "unauthorized") do
        let(:Authorization) { "invalid_token" }

        run_test!
      end
    end

    post("create transaction") do
      tags "Transactions"
      description "Create a transaction"
      consumes "application/json"
      produces "application/json"
      parameter name: "Authorization", in: :header, type: :string, required: true
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          transaction: {
            type: :object,
            properties: {
              name: { type: :string, example: "Name of the transaction" },
              date: { type: :string, format: :date, example: "2025-01-01" },
              amount: { type: :number, example: 100.00 },
              currency: { type: :string, example: "USD" },
              description: { type: :string, example: "Description of the transaction" },
              category_id: { type: :integer, example: 1 },
              payment_method_id: { type: :integer, example: 1 }
            },
            required: ["name", "date", "amount", "currency", "category_id", "payment_method_id"]
          }
        }
      }

      response(201, "created") do
        let(:Authorization) { "Bearer #{token}" }
        let(:transaction) {
          {
            transaction: {
              name: "Name of the transaction",
              date: "2025-01-01",
              amount: 100.00,
              currency: "USD",
              description: "Description of the transaction",
              category_id: user.categories.sample.id,
              payment_method_id: user.payment_methods.sample.id,
            }
          }
        }
        run_test!
      end

      response(422, "unprocessible entity") do
        let(:Authorization) { "Bearer #{token}" }
        let(:transaction) {
          {
            transaction: {
              name: "",
              date: "2025-01-01",
              amount: 100.00,
              currency: "USD",
              description: "Description of the transaction",
              category_id: user.categories.sample.id,
              payment_method_id: user.payment_methods.sample.id,
            }
          }
        }
        run_test!
      end
    end
  end

  path "/api/v1/transactions/{id}" do
    parameter name: "id", in: :path, type: :string, description: "Transaction ID"
    parameter name: "Authorization", in: :header, type: :string, required: true

    let(:target_transaction) { create(:transaction, user: user, category: user.categories.sample, payment_method: user.payment_methods.sample) }

    get("show transaction") do
      tags "Transactions"
      description "Get a transaction"
      produces "application/json"

      response(200, "ok") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { target_transaction.id }

        schema type: :object,
          properties: {
            id: { type: :integer },
            user_id: { type: :integer },
            name: { type: :string },
            date: { type: :string },
            amount: { type: :number },
            currency: { type: :string },
            description: { type: :string },
            created_at: { type: :string },
            updated_at: { type: :string },
            payment_method_id: { type: :integer },
            category_id: { type: :integer },
          }

        run_test!
      end

      response(404, "not found") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { "invalid_id" }

        run_test!
      end

      response(401, "unauthorized") do
        let(:Authorization) { "invalid_token" }
        let(:id) { target_transaction.id }

        run_test!
      end
    end

    patch("update transaction") do
      tags "Transactions"
      description "Update a transaction"
      consumes "application/json"
      produces "application/json"
      parameter name: "Authorization", in: :header, type: :string, required: true
      parameter name: :transaction, in: :body, schema: {
        type: :object,
        properties: {
          transaction: {
            type: :object,
            properties: {
              name: { type: :string, example: "Updated name of the transaction" },
              date: { type: :string, format: :date, example: "2025-01-01" },
              amount: { type: :number, example: 100.00 },
              currency: { type: :string, example: "USD" },
              description: { type: :string, example: "Upated description of the transaction" },
              category_id: { type: :integer, example: 1 },
              payment_method_id: { type: :integer, example: 1 }
            },
          }
        }
      }

      response(200, "ok") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { target_transaction.id }
        let(:transaction) {
          {
            transaction: {
              name: "Updated name of the transaction",
              date: "2025-01-01",
              amount: 100.00,
              currency: "USD",
              description: "Updated description of the transaction",
              category_id: user.categories.sample.id,
              payment_method_id: user.payment_methods.sample.id,
            }
          }
        }

        run_test!
      end

      response(422, "unprocessible entity") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { target_transaction.id }
        let(:transaction) {
          {
            transaction: {
              name: ""
            }
          }
        }
        run_test!
      end

      response(404, "not found") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { "invalid_id" }
        let(:transaction) {
          {
            transaction: {
              name: "Updated name of the transaction"
            }
          }
        }

        run_test!
      end
    end

    delete("delete transaction") do
      tags "Transactions"
      description "Delete a transaction"
      produces "application/json"
      parameter name: "Authorization", in: :header, type: :string, required: true

      response(204, "ok") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { target_transaction.id }

        run_test!
      end

      response(404, "not found") do
        let(:Authorization) { "Bearer #{token}" }
        let(:id) { "invalid_id" }

        run_test!
      end
    end
  end
end
