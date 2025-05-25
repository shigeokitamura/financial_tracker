class CreateCurrencyHistories < ActiveRecord::Migration[7.2]
  def change
    create_table :currency_histories do |t|
      t.string :currency, null: false
      t.float :value, null: false
      t.date :date, null: false

      t.timestamps
    end
  end
end
