import { useState } from 'react';
import { Modal } from './Modal';
import { TransactionForm } from './TransactionForm';
import { useCategories } from '../hooks/useCategories';
import { usePaymentMethods } from '../hooks/usePaymentMethods';
import { useTransactions } from '../hooks/useTransactions';
import { TransactionCreateParams } from '../types';

interface TransactionCreateProps {
  isOpen: boolean;
  onClose: () => void;
}
export function TransactionCreate({ isOpen, onClose }: TransactionCreateProps) {
  const categories = useCategories();
  const paymentMethods = usePaymentMethods();
  const { createTransaction } = useTransactions();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: TransactionCreateParams) => {
    try {
      await createTransaction.mutateAsync(data);
      onClose();
    } catch (err) {
      console.error(err);
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
