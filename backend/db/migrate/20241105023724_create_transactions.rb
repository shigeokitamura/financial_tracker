class CreateTransactions < ActiveRecord::Migration[7.2]
  def change
    create_table :transactions do |t|
      t.decimal :amount, null: false, precision: 10, scale: 2
      t.string :currency, null: false, default: "USD"
      t.string :title, null: false
      t.date :date, null: false
      t.text :description
      t.references :category, null: false, foreign_key: true
      t.references :payment_method, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end

    add_index :transactions, :date
  end
end
