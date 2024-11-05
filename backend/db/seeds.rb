# Create a test user
user = User.create!(
  name: "Test User",
  email: "test@example.com",
)

category = user.categories.find_by(name: "Food Expenses")
payment_method = user.payment_methods.find_by(name: "Cash")

# Create a transaction
Transaction.create!(
  title: "Lunch",
  date: "2024-11-04",
  amount: 10.0,
  currency: "USD",
  category: category,
  payment_method: payment_method,
  user: user,
)
