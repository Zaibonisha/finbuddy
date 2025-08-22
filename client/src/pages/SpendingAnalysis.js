import React, { useEffect, useState } from 'react';
import api from '../api';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function SpendingAnalysis() {
  const [summary, setSummary] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Demo data
  const demoData = [
    { month: 'Jan', income: 5000, expenses: 3500 },
    { month: 'Feb', income: 4800, expenses: 3000 },
    { month: 'Mar', income: 5200, expenses: 4000 },
    { month: 'Apr', income: 6000, expenses: 4500 },
    { month: 'May', income: 5500, expenses: 3800 },
    { month: 'Jun', income: 5800, expenses: 4200 },
  ];

  const demoSummary = 'Your average monthly income is $5550, and expenses are $3833.';

  useEffect(() => {
    setLoading(true);
    setError('');
    api.get('/spending/summary/')
      .then(res => {
        const apiData = res.data && res.data.data;
        if (Array.isArray(apiData) && apiData.length > 0) {
          setData(apiData);
          setSummary(res.data.summary || demoSummary);
        } else {
          // fallback if empty or invalid
          setData(demoData);
          setSummary(demoSummary);
        }
      })
      .catch(() => {
        setError('Failed to load spending data. Showing demo data.');
        setSummary(demoSummary);
        setData(demoData);
      })
      .finally(() => setLoading(false));
  }, []);

  const containerStyle = {
    maxWidth: '900px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    fontSize: '2rem',
    fontWeight: '600',
    marginBottom: '20px',
    color: '#333',
    textAlign: 'center',
  };

  const messageStyle = {
    textAlign: 'center',
    fontSize: '1rem',
    color: '#666',
  };

  const errorStyle = {
    color: '#e63946',
    fontWeight: 'bold',
    textAlign: 'center',
  };

  const summaryStyle = {
    marginTop: '20px',
    fontSize: '1.1rem',
    textAlign: 'center',
    color: '#444',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Spending Analysis</h1>

      {loading && <p style={messageStyle}>Loading spending data...</p>}
      {error && <p style={errorStyle}>{error}</p>}

      {data.length > 0 && (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="income" stroke="#10b981" name="Income" strokeWidth={2} />
            <Line type="monotone" dataKey="expenses" stroke="#6366f1" name="Expenses" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      )}

      {summary && <p style={summaryStyle}>{summary}</p>}
    </div>
  );
}
