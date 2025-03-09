class RemoveIndexFromPaymentMethodsName < ActiveRecord::Migration[7.2]
  def change
    remove_index :payment_methods, name: "index_payment_methods_on_name"
  end
end
