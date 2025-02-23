import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useTransactions } from "../hooks/useTransactions";

const TransactionsPage: React.FC = () => {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { transactions } = useTransactions();

  const DataRows = () => {
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
              <div className="text-center text-green-500">{transaction.amount}</div>
            </td>
            <td className="p-2">
              <div className="text-center text-sky-500">{transaction.description}</div>
            </td>
            <td className="p-2">
              <div className="text-center">{transaction.categoryId}</div>
            </td>
            <td className="p-2">
              <div className="text-center">{transaction.paymentMethodId}</div>
            </td>
            <td className="p-2">
              <div className="text-center">Edit</div>
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

    </div>
  )
}

export default TransactionsPage;
