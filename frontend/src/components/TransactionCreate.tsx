import { useState } from 'react';
import { Modal } from './Modal';
import { TransactionForm } from './TransactionForm';
import { useCategories } from '../hooks/useCategories';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useTransactions } from '../hooks/useTransactions';

interface TransactionCreateProps {
  isOpen: boolean;
  onClose: () => void;
}
export function TransactionCreate({ isOpen, onClose }: TransactionCreateProps) {
  const categories = useCategories();
  const paymentMethods = usePaymentMethods();
  const { createTransaction } = useTransactions();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      const modifiedData = {
        ...data,
        category_id: data.category,
        payment_method_id: data.payment_method,
      };

      await createTransaction.mutateAsync(modifiedData);
      onClose();
    } catch (err) {
      setError("Failed to create a transaction. Please try again later.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Transaction">
      {error && (
        <div className="mb-4 bg-red-50 p-4 rounded-md">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      <TransactionForm
        onSubmit={handleSubmit}
        categories={categories?.data ?? []}
        paymentMethods={paymentMethods?.data ?? []}
        // isSubmitting={createTransaction.isLoading}
      />
    </Modal>
  )
}
