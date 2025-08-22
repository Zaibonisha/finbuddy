import React, { useState } from 'react';
import api from '../api';  // your axios instance with auth tokens

export default function BudgetPlanner() {
  const [month, setMonth] = useState('');
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Demo suggestion logic
  const getDemoSuggestion = (incomeVal, expensesVal) => {
    const balance = incomeVal - expensesVal;
    if (balance > 1000) return 'Great! You have enough savings this month.';
    if (balance > 0) return 'You are breaking even. Try to save a bit more.';
    return 'Warning: Your expenses exceed your income. Consider cutting down costs.';
  };

  const calculateBudget = async () => {
    setSuggestion('');
    setError('');

    if (!month) {
      setError('Please select a month.');
      return;
    }

    const incomeVal = parseFloat(income.trim());
    const expensesVal = parseFloat(expenses.trim());

    if (isNaN(incomeVal) || isNaN(expensesVal)) {
      setError('Please enter valid numbers for income and expenses.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/budget/suggestions/', {
        month: month,
        income: incomeVal,
        expenses: expensesVal,
      });

      // Use API response if available, otherwise fallback to demo
      setSuggestion(res.data.suggestions || getDemoSuggestion(incomeVal, expensesVal));
    } catch (err) {
      setError('Failed to get budget suggestion. Showing demo suggestion.');
      setSuggestion(getDemoSuggestion(incomeVal, expensesVal));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Budget Planner</h1>

      <label style={styles.label}>
        Select Month
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          disabled={loading}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Monthly Income
        <input
          type="number"
          placeholder="Monthly Income"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          disabled={loading}
          style={styles.input}
        />
      </label>

      <label style={styles.label}>
        Monthly Expenses
        <input
          type="number"
          placeholder="Monthly Expenses"
          value={expenses}
          onChange={(e) => setExpenses(e.target.value)}
          disabled={loading}
          style={styles.input}
        />
      </label>

      <button
        onClick={calculateBudget}
        disabled={loading || !income || !expenses || !month}
        style={{
          ...styles.button,
          opacity: loading || !income || !expenses || !month ? 0.6 : 1,
          cursor: loading || !income || !expenses || !month ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>

      {suggestion && (
        <div style={styles.suggestionBox}>
          <strong>Suggestion:</strong>
          <p>{suggestion}</p>
        </div>
      )}

      {error && <p style={styles.errorText}>{error}</p>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '2rem auto',
    padding: '1.5rem',
    backgroundColor: '#fefefe',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    color: '#333',
    fontSize: '2rem',
  },
  label: {
    display: 'block',
    marginBottom: '1rem',
    fontWeight: '600',
    color: '#555',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '0.5rem 0.75rem',
    fontSize: '1rem',
    marginTop: '0.3rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  button: {
    width: '100%',
    padding: '0.75rem',
    fontSize: '1.1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  suggestionBox: {
    marginTop: '1.5rem',
    backgroundColor: '#e6f4ea',
    border: '1px solid #a2d5a1',
    borderRadius: '6px',
    padding: '1rem',
    color: '#2f6f33',
  },
  errorText: {
    marginTop: '1rem',
    color: '#d9534f',
    fontWeight: '600',
  },
};
