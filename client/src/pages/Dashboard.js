import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

const formatCurrency = (amount) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function Dashboard() {
  const [budgets, setBudgets] = useState([]);
  const [goals, setGoals] = useState([]);
  const [question, setQuestion] = useState('');
  const [advice, setAdvice] = useState('');
  const [error, setError] = useState('');

  // Form states for new goal
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [creatingGoal, setCreatingGoal] = useState(false);
  const [goalFormError, setGoalFormError] = useState('');

  const [message, setMessage] = useState(''); // Success messages

  useEffect(() => {
    fetchBudgets();
    fetchGoals();
  }, []);

  const fetchBudgets = () => {
    api.get('/budgets/')
      .then(res => setBudgets(res.data))
      .catch(() => setBudgets([]));
  };

  const fetchGoals = () => {
    api.get('/goals/')
      .then(res => setGoals(res.data))
      .catch(() => setGoals([]));
  };

  const askAdvice = async (e) => {
    e.preventDefault();
    setError('');
    setAdvice('');
    if (!question.trim()) return;

    try {
      const res = await api.post('/advice/', { question });
      setAdvice(res.data.advice);
    } catch {
      setError('Failed to get advice');
    }
  };

  const handleCreateGoal = async (e) => {
    e.preventDefault();
    setGoalFormError('');
    setMessage('');

    if (!newGoalName.trim() || !newGoalTarget) {
      setGoalFormError('Please enter goal name and target amount.');
      return;
    }

    const targetNum = parseFloat(newGoalTarget);
    if (isNaN(targetNum) || targetNum <= 0) {
      setGoalFormError('Target amount must be a positive number.');
      return;
    }

    const postData = {
      name: newGoalName.trim(),
      target_amount: targetNum,
    };

    if (newGoalDeadline) postData.deadline = newGoalDeadline;

    setCreatingGoal(true);
    try {
      await api.post('/goals/', postData);
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalDeadline('');
      fetchGoals();
      setMessage('Goal added successfully.');
    } catch {
      setGoalFormError('Failed to create goal. Please try again.');
    } finally {
      setCreatingGoal(false);
    }
  };

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <Link to="/budget" style={styles.navLink}>Budget Planner</Link>
        <Link to="/analysis" style={styles.navLink}>Spending Analysis</Link>
        <Link to="/goals" style={styles.navLink}>Goals</Link>
        <Link to="/learning-hub" style={styles.navLink}>Learning Hub</Link>
      </nav>

      <h1 style={styles.heading}>Dashboard</h1>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Budgets</h2>
        {budgets.length === 0 ? (
          <p style={styles.emptyMessage}>No budgets yet. Please add some budgets to get started!</p>
        ) : (
          <ul style={styles.list}>
            {budgets.map(b => (
              <li key={b.id} style={styles.listItem}>
                <strong>{b.month}</strong>: Income {formatCurrency(b.income)}, Expenses {formatCurrency(b.expenses)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Goals</h2>

        <form onSubmit={handleCreateGoal} style={styles.form}>
          <input
            type="text"
            placeholder="New Goal Name"
            value={newGoalName}
            onChange={e => setNewGoalName(e.target.value)}
            disabled={creatingGoal}
            style={styles.input}
            required
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={newGoalTarget}
            onChange={e => setNewGoalTarget(e.target.value)}
            disabled={creatingGoal}
            style={styles.input}
            min="0.01"
            step="0.01"
            required
          />
          <input
            type="date"
            value={newGoalDeadline}
            onChange={e => setNewGoalDeadline(e.target.value)}
            disabled={creatingGoal}
            style={styles.input}
          />
          <button type="submit" disabled={creatingGoal} style={styles.button}>
            {creatingGoal ? 'Adding...' : 'Add Goal'}
          </button>
        </form>
        {goalFormError && <p style={styles.errorText}>{goalFormError}</p>}
        {message && <p style={styles.successText}>{message}</p>}

        <button onClick={fetchGoals} style={{ ...styles.button, marginBottom: '1rem' }}>
          Refresh Goals
        </button>

        <ul style={styles.list}>
          {goals.length === 0 ? (
            <li style={styles.emptyMessage}>No goals found.</li>
          ) : (
            goals.map(g => (
              <li key={g.id} style={styles.listItem}>
                {g.name}: Saved {formatCurrency(g.saved_amount)} / Target {formatCurrency(g.target_amount)}
                {g.deadline && ` (Deadline: ${g.deadline})`}
              </li>
            ))
          )}
        </ul>
      </section>

      <section style={styles.section}>
        <h2 style={styles.subHeading}>Ask AI Financial Advice</h2>
        <form onSubmit={askAdvice} style={styles.formInline}>
          <input
            value={question}
            onChange={e => setQuestion(e.target.value)}
            placeholder="Type your question..."
            required
            style={{ ...styles.input, flex: 1, marginRight: '0.5rem' }}
          />
          <button type="submit" style={styles.button}>Ask</button>
        </form>
        {advice && <p style={styles.adviceText}><strong>Advice:</strong> {advice}</p>}
        {error && <p style={styles.errorText}>{error}</p>}
      </section>
    </div>
  );
}

const styles = {
  container: {
    padding: '1.5rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  nav: {
    marginBottom: '1.5rem',
    borderBottom: '1px solid #ddd',
    paddingBottom: '0.5rem',
  },
  navLink: {
    marginRight: '1.5rem',
    textDecoration: 'none',
    color: '#007bff',
    fontWeight: '600',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#222',
  },
  subHeading: {
    fontSize: '1.8rem',
    marginBottom: '0.8rem',
    color: '#333',
    borderBottom: '1px solid #eee',
    paddingBottom: '0.3rem',
  },
  section: {
    marginBottom: '2rem',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
    marginTop: 0,
  },
  listItem: {
    backgroundColor: '#fff',
    padding: '0.75rem 1rem',
    marginBottom: '0.5rem',
    borderRadius: '6px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  form: {
    display: 'flex',
    marginBottom: '1rem',
    gap: '0.5rem',
  },
  formInline: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '0.5rem',
  },
  input: {
    padding: '0.5rem 0.75rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    transition: 'background-color 0.3s ease',
  },
  errorText: {
    color: '#d9534f',
    marginTop: '0.25rem',
  },
  successText: {
    color: '#28a745',
    marginTop: '0.25rem',
  },
  adviceText: {
    marginTop: '1rem',
    backgroundColor: '#e9f7ef',
    padding: '1rem',
    borderRadius: '6px',
    color: '#155724',
    fontWeight: '500',
  },
  emptyMessage: {
    fontStyle: 'italic',
    color: '#666',
    padding: '1rem 0',
  },
};
