import React, { useState, useEffect } from 'react';
import api from '../api';

const formatCurrency = (amount) =>
  amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

export default function Goals() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newGoalName, setNewGoalName] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDeadline, setNewGoalDeadline] = useState('');
  const [addAmount, setAddAmount] = useState({});  // Track added amounts per goal
  const [message, setMessage] = useState('');      // Success messages

  const fetchGoals = () => {
    setLoading(true);
    setError('');
    api.get('/goals/')
      .then(res => setGoals(res.data))
      .catch(() => setError('Failed to load goals.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const handleAddGoal = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!newGoalName.trim() || !newGoalTarget) {
      setError('Please enter goal name and target amount.');
      return;
    }

    const targetNum = parseFloat(newGoalTarget);
    if (isNaN(targetNum) || targetNum <= 0) {
      setError('Target amount must be a positive number.');
      return;
    }

    const postData = {
      name: newGoalName.trim(),
      target_amount: targetNum,
    };

    if (newGoalDeadline) {
      postData.deadline = newGoalDeadline;
    }

    try {
      await api.post('/goals/', postData);
      setNewGoalName('');
      setNewGoalTarget('');
      setNewGoalDeadline('');
      fetchGoals();
      setMessage('Goal added successfully.');
    } catch {
      setError('Failed to create goal. Please try again.');
    }
  };

  const handleAddSavedAmount = async (goalId) => {
    setError('');
    setMessage('');

    const amountStr = addAmount[goalId];
    if (!amountStr || isNaN(amountStr) || parseFloat(amountStr) <= 0) {
      setError('Please enter a valid positive amount to add.');
      return;
    }

    const amount = parseFloat(amountStr);

    try {
      const res = await api.post(`/goals/${goalId}/add_saved_amount/`, { amount });
      setMessage(res.data.message || 'Amount added successfully.');
      setAddAmount(prev => ({ ...prev, [goalId]: '' }));
      fetchGoals();
    } catch (err) {
      const errMsg = err.response?.data?.error || 'Failed to add saved amount.';
      setError(errMsg);
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>My Financial Goals</h1>

      <form onSubmit={handleAddGoal} style={styles.form}>
        <input
          type="text"
          placeholder="Goal name"
          value={newGoalName}
          onChange={(e) => setNewGoalName(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="number"
          placeholder="Target amount"
          value={newGoalTarget}
          onChange={(e) => setNewGoalTarget(e.target.value)}
          required
          min="0.01"
          step="0.01"
          style={styles.input}
        />
        <input
          type="date"
          value={newGoalDeadline}
          onChange={(e) => setNewGoalDeadline(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Add Goal</button>
      </form>

      {loading && <p>Loading goals...</p>}

      {error && <p style={styles.error}>{error}</p>}
      {message && <p style={styles.success}>{message}</p>}

      {!loading && !error && (
        <>
          {goals.length === 0 ? (
            <p>No goals found. Set some goals to get started!</p>
          ) : (
            <ul style={styles.list}>
              {goals.map(goal => {
                const remaining = goal.target_amount - goal.saved_amount;
                return (
                  <li key={goal.id} style={styles.goalCard}>
                    <strong>{goal.name}</strong> — {formatCurrency(goal.saved_amount)} / {formatCurrency(goal.target_amount)}{' '}
                    {goal.deadline && ` (Deadline: ${goal.deadline})`}
                    <br />
                    {remaining > 0 ? (
                      <>
                        <input
                          type="number"
                          placeholder={`Add saved amount (remaining ${formatCurrency(remaining)})`}
                          value={addAmount[goal.id] || ''}
                          onChange={(e) =>
                            setAddAmount(prev => ({ ...prev, [goal.id]: e.target.value }))
                          }
                          min="0.01"
                          step="0.01"
                          style={styles.inputSmall}
                        />
                        <button onClick={() => handleAddSavedAmount(goal.id)} style={styles.addButton}>Add</button>
                      </>
                    ) : (
                      <span style={styles.completedText}>
                        Goal fully saved! 🎉
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </main>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '2rem auto',
    padding: '1rem 2rem',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: '#fafafa',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#2c3e50',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '1rem',
    justifyContent: 'center',
  },
  input: {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    flex: '1 1 150px',
    minWidth: '150px',
  },
  inputSmall: {
    padding: '0.4rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '150px',
    marginRight: '0.5rem',
  },
  button: {
    padding: '0.75rem 1.2rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
  },
  addButton: {
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#28a745',
    color: '#fff',
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  success: {
    color: 'green',
    marginBottom: '1rem',
    textAlign: 'center',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  goalCard: {
    backgroundColor: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '6px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.1)',
  },
  completedText: {
    color: '#28a745',
    fontWeight: 'bold',
    marginTop: '0.5rem',
    display: 'inline-block',
  },
};
