Rails.application.routes.draw do
  mount Rswag::Ui::Engine => "/api-docs"
  mount Rswag::Api::Engine => "/api-docs"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "/auth/:provider/callback", to: "sessions#create"
  get "/auth/guest", to: "sessions#guest"

  namespace :api do
    namespace :v1 do
      get "users/current", to: "users#current_user"

      resources :transactions
      resources :categories, only: :index
      resources :payment_methods, only: :index
    end
  end
end
