import { useState } from 'react';
import { Modal } from './Modal';
import { TransactionForm } from './TransactionForm';
import { useTransactions } from '../hooks/useTransactions';
import { Transaction, TransactionEditParams } from '../types';
import { useCategories } from '../hooks/useCategories';
import { usePaymentMethods } from '../hooks/usePaymentMethods';

interface TransactionEditProps {
  isOpen: boolean;
  onClose: () => void;
  transaction: Transaction | null;
}

export function TransactionEdit({ isOpen, onClose, transaction }: TransactionEditProps) {
  const categories = useCategories();
  const paymentMethods = usePaymentMethods();
  const { updateTransaction } = useTransactions();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: TransactionEditParams) => {
    try {
      await updateTransaction.mutateAsync({ id: transaction!.id, data });
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update transaction. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Transaction">
      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
      {transaction && (
        <TransactionForm
          onSubmit={handleSubmit}
          initialData={{
            ...transaction,
            category_id: transaction.category.id,
            payment_method_id: transaction.payment_method.id,
          }}
          categories={categories?.data ?? []}
          paymentMethods={paymentMethods?.data ?? []}
        />
      )}
    </Modal>
  );
}
