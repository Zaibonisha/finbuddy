import openai
import logging
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY

logger = logging.getLogger(__name__)

def get_financial_advice(prompt: str) -> str:
    if not prompt.strip():
        return "Please provide a valid prompt."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful financial advisor."},
                {"role": "user", "content": prompt.strip()}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "Sorry, I couldn't retrieve advice at the moment. Please try again later."

def get_budget_suggestions(budget_data: str) -> str:
    if not budget_data.strip():
        return "Please provide valid budget data."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a financial assistant helping with budget planning."},
                {"role": "user", "content": f"Give budget suggestions based on this data: {budget_data}"}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "Sorry, I couldn't retrieve budget suggestions at the moment."

def get_goal_progress(goal_data: str) -> str:
    if not goal_data.strip():
        return "Please provide valid goal data."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a financial assistant helping with goal tracking."},
                {"role": "user", "content": f"Provide progress update based on: {goal_data}"}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "Sorry, I couldn't retrieve goal progress at the moment."

def get_spending_summary(spending_data: str) -> str:
    if not spending_data.strip():
        return "Please provide valid spending data."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a financial assistant summarizing spending."},
                {"role": "user", "content": f"Summarize spending based on: {spending_data}"}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "Sorry, I couldn't retrieve spending summary at the moment."

def get_learning_content(topic: str) -> str:
    if not topic.strip():
        return "Please provide a topic."
    try:
        response = openai.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful financial tutor."},
                {"role": "user", "content": f"Provide learning content about: {topic}"}
            ],
            max_tokens=300,
            temperature=0.7,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        logger.error(f"OpenAI API error: {e}")
        return "Sorry, I couldn't retrieve learning content at the moment."
