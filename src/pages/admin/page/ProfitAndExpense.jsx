import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../../context/data/myContext';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { fireDB } from '../../../firebase/FirebaseConfig';
import { CSVLink } from 'react-csv';
import { Link } from 'react-router-dom';

const ProfitAndExpense = () => {
  const { order = [] } = useContext(myContext);
  const [expenses, setExpenses] = useState([]);
  const [expenseInput, setExpenseInput] = useState({ name: '', amount: '', category: 'Operational', notes: '', date: new Date().toISOString().slice(0,10) });
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStartDate, setFilterStartDate] = useState('');
  const [filterEndDate, setFilterEndDate] = useState('');

  // Calculate total revenue from all orders
  const totalRevenue = order.reduce((acc, o) => acc + (o.totalAmount || 0), 0);
  const totalExpenses = expenses.reduce((acc, e) => acc + Number(e.amount), 0);
  const profit = totalRevenue - totalExpenses;

  // Fetch expenses from Firestore on mount
  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      try {
        const snapshot = await getDocs(collection(fireDB, 'expenses'));
        const expArr = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setExpenses(expArr);
      } catch (err) {
        console.error('Failed to fetch expenses:', err);
      }
      setLoading(false);
    };
    fetchExpenses();
  }, []);

  // Add a new expense and persist to Firestore
  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!expenseInput.name || !expenseInput.amount) return;
    try {
      const docRef = await addDoc(collection(fireDB, 'expenses'), expenseInput);
      setExpenses([...expenses, { ...expenseInput, id: docRef.id }]);
      setExpenseInput({ name: '', amount: '', category: 'Operational', notes: '', date: new Date().toISOString().slice(0,10) });
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  // Delete an expense from Firestore
  const handleDeleteExpense = async (id) => {
    try {
      await deleteDoc(doc(fireDB, 'expenses', id));
      setExpenses(expenses.filter(e => e.id !== id));
    } catch (err) {
      console.error('Failed to delete expense:', err);
    }
  };

  // Predefined expense templates
  const expenseTemplates = [
    { name: 'Shipping', amount: 0, category: 'Operational', notes: 'Shipping cost', date: new Date().toISOString().slice(0,10) },
    { name: 'Marketing', amount: 0, category: 'Marketing', notes: 'Marketing spend', date: new Date().toISOString().slice(0,10) },
    { name: 'Rent', amount: 0, category: 'Fixed', notes: 'Office/shop rent', date: new Date().toISOString().slice(0,10) },
    { name: 'Salaries', amount: 0, category: 'Fixed', notes: 'Employee salaries', date: new Date().toISOString().slice(0,10) },
    { name: 'Utilities', amount: 0, category: 'Operational', notes: 'Electricity, water, etc.', date: new Date().toISOString().slice(0,10) },
    { name: 'Packaging', amount: 0, category: 'Operational', notes: 'Packaging materials', date: new Date().toISOString().slice(0,10) },
  ];
  const categories = ['Operational', 'Marketing', 'Fixed', 'Variable', 'Other'];

  // Filtered expenses for display and export
  const filteredExpenses = expenses.filter(exp =>
    (filterCategory === 'All' || exp.category === filterCategory) &&
    (!filterStartDate || exp.date >= filterStartDate) &&
    (!filterEndDate || exp.date <= filterEndDate)
  );

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <Link to="/" className="inline-block mb-4 bg-gray-200 hover:bg-blue-200 text-gray-800 px-4 py-2 rounded font-semibold">← Back to Main Website</Link>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Profit & Expense Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-green-800">Total Revenue</h3>
          <p className="text-2xl font-bold text-green-900">₹{totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-900">₹{totalExpenses.toLocaleString()}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded-lg text-center">
          <h3 className="text-lg font-semibold text-blue-800">Profit</h3>
          <p className="text-2xl font-bold text-blue-900">₹{profit.toLocaleString()}</p>
        </div>
      </div>
      {/* Expense Templates */}
      <div className="flex flex-wrap gap-2 mb-4">
        {expenseTemplates.map((tpl) => (
          <button
            key={tpl.name}
            type="button"
            className="bg-gray-200 hover:bg-blue-200 text-gray-800 px-3 py-1 rounded"
            onClick={() => setExpenseInput({ ...tpl })}
          >
            {tpl.name}
          </button>
        ))}
      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="px-3 py-2 border rounded">
          <option value="All">All Categories</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input type="date" value={filterStartDate} onChange={e => setFilterStartDate(e.target.value)} className="px-3 py-2 border rounded" />
        <input type="date" value={filterEndDate} onChange={e => setFilterEndDate(e.target.value)} className="px-3 py-2 border rounded" />
      </div>
      <form onSubmit={handleAddExpense} className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Expense Name"
          value={expenseInput.name}
          onChange={e => setExpenseInput({ ...expenseInput, name: e.target.value })}
          className="px-3 py-2 border rounded w-full md:w-1/5"
        />
        <input
          type="number"
          placeholder="Amount"
          value={expenseInput.amount}
          onChange={e => setExpenseInput({ ...expenseInput, amount: e.target.value })}
          className="px-3 py-2 border rounded w-full md:w-1/5"
        />
        <select
          value={expenseInput.category}
          onChange={e => setExpenseInput({ ...expenseInput, category: e.target.value })}
          className="px-3 py-2 border rounded w-full md:w-1/5"
        >
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="date"
          value={expenseInput.date}
          onChange={e => setExpenseInput({ ...expenseInput, date: e.target.value })}
          className="px-3 py-2 border rounded w-full md:w-1/5"
        />
        <input
          type="text"
          placeholder="Notes"
          value={expenseInput.notes}
          onChange={e => setExpenseInput({ ...expenseInput, notes: e.target.value })}
          className="px-3 py-2 border rounded w-full md:w-1/5"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Add Expense</button>
      </form>
      {/* Export CSV */}
      <div className="mb-4">
        <CSVLink data={filteredExpenses} filename="expenses.csv" className="bg-green-500 text-white px-4 py-2 rounded">Export CSV</CSVLink>
      </div>
      {loading ? (
        <div className="text-center text-gray-500 py-8">Loading expenses...</div>
      ) : (
        <table className="w-full mb-6">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Expense Name</th>
              <th className="py-2 px-4 text-left">Amount (₹)</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Notes</th>
              <th className="py-2 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map(exp => (
              <tr key={exp.id}>
                <td className="py-2 px-4">{exp.name}</td>
                <td className="py-2 px-4">{Number(exp.amount).toLocaleString()}</td>
                <td className="py-2 px-4">{exp.category}</td>
                <td className="py-2 px-4">{exp.date}</td>
                <td className="py-2 px-4">{exp.notes}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleDeleteExpense(exp.id)} className="text-red-500 underline">Delete</button>
                </td>
              </tr>
            ))}
            {filteredExpenses.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-4">No expenses found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ProfitAndExpense; 