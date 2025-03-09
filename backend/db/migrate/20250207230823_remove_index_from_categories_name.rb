class RemoveIndexFromCategoriesName < ActiveRecord::Migration[7.2]
  def change
    remove_index :categories, name: "index_categories_on_name"
  end
end
