class CreateTransactions < ActiveRecord::Migration[7.2]
  def change
    create_table :transactions do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.date :date, null: false
      t.decimal :amount, null: false
      t.string :currency, null: false
      t.string :description

      t.timestamps
    end
  end
end
