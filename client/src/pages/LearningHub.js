import React, { useState } from 'react';
import { Sparkles, BookOpenCheck } from 'lucide-react'; // Requires lucide-react
import api from '../api';

export default function LearningHub() {
  const [topic, setTopic] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Informative fallback content with topic-specific tips
  const demoContent = {
    saving:
      "Saving is the practice of setting aside a portion of your income for future needs or goals rather than spending it all immediately. A common guideline is the 50/30/20 rule: 50% for essentials, 30% for wants, and 20% for savings or debt repayment. Regular saving helps build an emergency fund, prepares you for unexpected expenses, and provides financial stability over time.\n\nTips for Saving:\n- Automate savings by setting up automatic transfers to a savings account.\n- Start small; even saving $10–$50 a week adds up over time.\n- Track expenses to identify areas where you can cut back and save more.\n- Build an emergency fund covering 3–6 months of expenses.",
    investing:
      "Investing involves using your money to acquire assets such as stocks, bonds, or real estate, with the goal of growing your wealth over time. Unlike saving, investing carries some level of risk, but it also offers the potential for higher returns. A well-diversified investment strategy can help you achieve long-term financial goals like retirement, education funding, or buying a home.\n\nTips for Investing:\n- Diversify across asset classes to reduce risk.\n- Focus on long-term growth rather than short-term market fluctuations.\n- Start investing early to take advantage of compounding.\n- Educate yourself about investment options and consider low-cost index funds if new to investing.",
    "credit score":
      "A credit score is a numerical representation of your creditworthiness, reflecting how reliably you manage debt and payments. Factors affecting your score include paying bills on time, maintaining low balances, and responsibly managing credit accounts. A strong credit score can help you secure loans at better interest rates and demonstrate financial responsibility to lenders.\n\nTips for Improving Your Credit Score:\n- Always pay bills on time, including credit cards and loans.\n- Keep credit utilization below 30% of your total credit limit.\n- Avoid opening multiple new accounts in a short period.\n- Regularly check your credit report for errors and dispute them if needed.",
  };

  const getLearningContent = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      setContent('');
      return;
    }

    setLoading(true);
    setError('');
    setContent('');

    try {
      const res = await api.post('/learning/content/', { topic });
      setContent(res.data.content);
    } catch (err) {
      // Fallback informative content with tips
      const lowerTopic = topic.toLowerCase();
      if (demoContent[lowerTopic]) {
        setContent(demoContent[lowerTopic]);
        setError(''); // Remove any demo message
      } else {
        setError('Failed to load learning content. Try "saving", "investing", or "credit score".');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Sparkles size={32} color="#007bff" />
        <h1 style={styles.heading}>Learning Hub</h1>
      </div>
      <p style={styles.subtext}>
        Discover beginner-friendly explanations of personal finance topics.
      </p>

      <div style={styles.inputGroup}>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., saving, investing, credit score"
          style={styles.input}
        />
        <button onClick={getLearningContent} disabled={loading} style={styles.button}>
          {loading ? 'Thinking...' : 'Teach Me'}
        </button>
      </div>

      {error && <p style={styles.error}>{error}</p>}

      {content && (
        <div style={styles.contentBox}>
          <div style={styles.contentHeader}>
            <BookOpenCheck size={24} color="#007bff" />
            <h3 style={styles.contentHeading}>AI-Generated Explanation</h3>
          </div>
          <p style={styles.content}>{content}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'Segoe UI, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  heading: {
    fontSize: '2.2rem',
    margin: 0,
  },
  subtext: {
    fontSize: '1rem',
    marginBottom: '1.5rem',
    color: '#555',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
    gap: '0.5rem',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.6rem',
    fontSize: '1rem',
    width: '60%',
    minWidth: '240px',
    border: '1px solid #ccc',
    borderRadius: '6px',
  },
  button: {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    minWidth: '100px',
  },
  error: {
    color: '#dc3545',
    fontWeight: '500',
  },
  contentBox: {
    marginTop: '2rem',
    padding: '1.5rem',
    backgroundColor: '#f8f9fa',
    borderRadius: '10px',
    textAlign: 'left',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    marginBottom: '0.5rem',
  },
  contentHeading: {
    fontSize: '1.3rem',
    margin: 0,
    color: '#007bff',
  },
  content: {
    fontSize: '1rem',
    lineHeight: '1.6',
    whiteSpace: 'pre-line',
    color: '#333',
  },
};
