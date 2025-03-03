class CreatePaymentMethods < ActiveRecord::Migration[7.2]
  def change
    create_table :payment_methods do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :description

      t.timestamps
    end
    add_index :payment_methods, :name, unique: true
  end
end
