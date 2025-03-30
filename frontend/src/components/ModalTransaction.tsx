import React, { useEffect, useRef, useState } from "react";
import Transition from "../utils/Transition";
import { Transaction, TransactionRequestParams } from "../types/transaction";
import { useTransactions } from "../hooks/useTransactions";

interface ModalTransactionProps {
  modalOpen: boolean,
  setModalOpen: (open: boolean) => void;
  transactionData?: Transaction;
}

interface FormState {
  name: string;
  date: string;
  amount: number;
  currency: string;
  description: string;
  categoryId: number;
  paymentMethodId: number;
};

// Mock
const CATEGORIES = [
  { id: 8, name: "Food Expenses" },
  { id: 9, name: "Transportation Expenses" },
  { id: 10, name: "Housing Expenses" },
  { id: 11, name: "Entertainment Expenses" },
  { id: 12, name: "Medical Expenses" },
  { id: 13, name: "UtilEducation Espensesities" },
  { id: 14, name: "Incomes" }
];

const PAYMENT_METHODS = [
  { id: 5, name: "Cash" },
  { id: 6, name: "Credit / Debit" },
  { id: 7, name: "E-money" },
  { id: 8, name: "Bank Transfer" }
];

const CURRENCIES = [
  "AUD",
  "CAD",
  "CNY",
  "EUR",
  "GBP",
  "HKD",
  "INR",
  "JPY",
  "KRW",
  "TWD",
  "USD",
];

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function ModalTransaction({
  modalOpen,
  setModalOpen,
  transactionData,
}: ModalTransactionProps) {

  const modalContent = useRef<HTMLDivElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);
  const { createTransaction, updateTransaction, deleteTransaction } = useTransactions();

  const [formState, setFormState] = useState<FormState>({
    name: "",
    date: formatDate(new Date()),
    amount: 0.0,
    currency: "",
    description: "",
    categoryId: 0,
    paymentMethodId: 0
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formState.name) errors.push("Name is required");
    if (!formState.date) errors.push("Date is required");
    if (formState.amount <= 0) errors.push("Amount must be greater than 0");
    if (!formState.currency) errors.push("Currency is required");
    if (formState.categoryId == 0) errors.push("Category is required");
    if (formState.paymentMethodId == 0) errors.push("Payment method is required");

    return errors
  }

  function convertFormStateToTransactionRequestParams(): TransactionRequestParams {
    return {
      name: formState.name,
      date: new Date(formState.date),
      amount: formState.amount,
      currency: formState.currency,
      description: formState.description,
      category_id: formState.categoryId,
      payment_method_id: formState.paymentMethodId
    };
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const errors = validateForm();

    try {
      if (errors.length > 0) {
        window.alert(errors.join("\n"));
        throw new Error(errors.join("\n"));
      }

      await createTransaction.mutateAsync(convertFormStateToTransactionRequestParams());
      setModalOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating the transaction.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const errors = validateForm();

    try {
      if (errors.length > 0) {
        window.alert(errors.join("\n"));
        throw new Error(errors.join("\n"));
      }

      await updateTransaction.mutateAsync({
        id: transactionData!.id,
        data: convertFormStateToTransactionRequestParams(),
      });

      setModalOpen(false);

    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while creating the transaction.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        await deleteTransaction.mutateAsync(transactionData!.id);
        setModalOpen(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while deleting the transaction.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    if (transactionData) {
      setFormState({
        name: transactionData.name,
        date: transactionData.date.toString(),
        amount: transactionData.amount,
        currency: transactionData.currency,
        description: transactionData.description,
        categoryId: transactionData.categoryId,
        paymentMethodId: transactionData.paymentMethodId
      });
    } else {
      setFormState({
        name: "",
        date: formatDate(new Date()),
        amount: 0.0,
        currency: "",
        description: "",
        categoryId: 0,
        paymentMethodId: 0
      });
    }
  }, [transactionData]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modalOpen || modalContent.current?.contains(target as Node)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!modalOpen || key !== "Escape") return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current && searchInput.current.focus();
  }, [modalOpen]);

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-gray-900/30 z-50 transition-opacity"
        show={modalOpen}
        appear={undefined}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-20 mb-4 justify-center px-4 sm:px-6"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        appear={undefined}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-gray-800 border border-transparent dark:border-gray-700/60 overflow-auto max-w-2xl w-full max-h-full rounded-lg shadow-lg"
        >
          <div className="py-4 px-2">
            <div className="mb-3 last:mb-0">
              <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
                { transactionData?.id ? "Edit Transaction" :  "Add Transaction" }
              </h1>
            </div>
            <div className="mb-3 last:mb-0">
              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 text-left">Name</div>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
                placeholder="e.g., Grocery Shopping"
              />

              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 text-left">Date</div>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formState.date}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
              />

              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 text-left">Amount</div>
              <div className="flex">
                <input
                  id="amount"
                  name="amount"
                  type="number"
                  required
                  value={formState.amount}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 mr-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
                />
                <select
                  id="currency"
                  name="currency"
                  value={formState.currency}
                  onChange={handleChange}
                  className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 ml-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
                >
                  <option value=""></option>
                  {CURRENCIES.map(currency => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </select>
              </div>

              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 text-left">Category</div>
              <select
                id="categoryId"
                name="categoryId"
                value={formState.categoryId}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
              >
                <option value={0}></option>
                {CATEGORIES.map(category => (
                  <option key={category.name} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 text-left">Payment Method</div>
              <select
                id="paymentMethodId"
                name="paymentMethodId"
                value={formState.paymentMethodId}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
              >
                <option value={0}></option>
                {PAYMENT_METHODS.map(paymentMethod => (
                  <option key={paymentMethod.name} value={paymentMethod.id}>
                    {paymentMethod.name}
                  </option>
                ))}
              </select>

              <div className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase px-2 mb-2 text-left">Description</div>
              <input
                id="description"
                name="description"
                type="text"
                required
                value={formState.description}
                onChange={handleChange}
                className="w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white mb-2"
              />
            </div>

            <div className="mb-3 last:mb-0">
              { transactionData ? (
                <div>
                  <button
                    className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white mx-2"
                    type="submit"
                    onClick={handleUpdate}
                    disabled={isSubmitting}
                  >
                    Update
                  </button>
                  <button
                    className="btn bg-red-500 text-white hover:bg-red-700 dark:bg-red-500 dark:text-white dark:hover:bg-red-700 mx-2"
                    type="submit"
                    onClick={handleDelete}
                    disabled={isSubmitting}
                  >
                    Delete
                </button>
              </div>
              ) : (
                <button
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              ) }
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalTransaction;
