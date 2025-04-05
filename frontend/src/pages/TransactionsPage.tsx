import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useTransactions } from "../hooks/useTransactions";
import ModalTransaction from "../components/ModalTransaction";
import { Link } from "react-router-dom";
import { Transaction } from "../types/transaction";

const TransactionsPage: React.FC = (variant = "default") => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { transactions } = useTransactions();

  const [transactionModalOpen, setTransactionModalOpen] = useState(false)
  const [transactionData, setTransactionData] = useState<Transaction | undefined>(undefined)

  const handleAddTransaction = () => {
    setTransactionData(undefined)
    setTransactionModalOpen(true);
  }

  const handleEditTransaction = (transaction: Transaction) => {
    setTransactionData(transaction);
    setTransactionModalOpen(true);
  }

  const DataRows = () => {
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
    const formatCurrency = (amount: number, currency: string): string => {
      console.log(currency)
      if (["AUD", "CAD", "HKD", "TWD", "USD"].includes(currency)) {
        return `$${amount} ${currency}`
      }
      if (["CNY", "JPY"].includes(currency)) {
        return `¥${amount} ${currency}`
      }
      if (currency === "EUR") {
        return `€${amount} ${currency}`
      }
      if (currency == "GBP") {
        return `£${amount} ${currency}`
      }
      if (currency == "INR") {
        return `₹${amount} ${currency}`
      }
      if (currency == "KRW") {
        return `₩${amount} ${currency}`
      }

      return `${amount} ${currency}`
    }

    if (transactions.isLoading) {
      return (
        <tr>Loading...</tr>
      )
    }

    if (transactions.isError) {
      return <tr>Error: {transactions.error.message}</tr>
    }

    return (
      <>
        {transactions.data?.map((transaction) => (
          <tr>
            <td className="p-2">
              <div className="flex items-center">
                <div className="text-gray-800 dark:text-gray-100">{transaction.name}</div>
              </div>
            </td>
            <td className="p-2">
              <div className="text-center">{transaction.date.toString()}</div>
            </td>
            <td className="p-2">
              <div className="text-center text-green-500">{formatCurrency(transaction.amount, transaction.currency)}</div>
            </td>
            <td className="p-2">
              <div className="text-center text-sky-500">{transaction.description}</div>
            </td>
            <td className="p-2">
              <div className="text-center">{CATEGORIES.find((category) => category.id === transaction.categoryId)?.name}</div>
            </td>
            <td className="p-2">
              <div className="text-center">{PAYMENT_METHODS.find((payment_method) => payment_method.id === transaction.paymentMethodId)?.name}</div>
            </td>
            <td className="p-2">
              <Link
                className="text-center"
                to={`#${transaction.id}`}
                onClick={(e) => {e.stopPropagation(); handleEditTransaction(transaction)}}
              >
                <span>Edit</span>
              </Link>
            </td>
          </tr>
        ))}
      </>
    )
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">Transactions</h1>
              </div>

              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                <button
                  className="btn bg-gray-900 text-gray-100 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-800 dark:hover:bg-white"
                  onClick={(e) => { e.stopPropagation(); handleAddTransaction(); }}
                  aria-controls="transaction-modal"
                >
                  <svg className="fill-current shrink-0 xs:hidden" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                  </svg>
                  <span className="max-xs:sr-only">Add Transaction</span>
                </button>
              </div>
            </div>
            <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
              <div className="p-3">
                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="table-auto w-full dark:text-gray-300">
                    {/* Table header */}
                    <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
                      <tr>
                        <th className="p-2">
                          <div className="font-semibold text-left">Name</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Date</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Amount</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Description</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Category</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Payment Method</div>
                        </th>
                        <th className="p-2">
                          <div className="font-semibold text-center">Action</div>
                        </th>
                      </tr>
                    </thead>
                    {/* Table body */}
                    <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
                      {/* Rows */}
                      <DataRows />
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between h-16 ${variant === 'v2' || variant === 'v3' ? '' : 'lg:border-b border-gray-200 dark:border-gray-700/60'}`}>
          <div className="flex items-center space-x-3">
            <ModalTransaction
              modalOpen={transactionModalOpen}
              setModalOpen={setTransactionModalOpen}
              transactionData={transactionData}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionsPage;
