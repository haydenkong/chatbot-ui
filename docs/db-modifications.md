# Database Modifications for Tier-Based Message Limits

To implement tier-based message limits, you need to modify your database schema to track the number of messages sent per day for each model and user tier. Here are the steps to do this:

1. **Add a new table to track message counts:**

```sql
CREATE TABLE user_message_counts (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    model_id VARCHAR(255) NOT NULL,
    tier VARCHAR(50) NOT NULL,
    message_count INTEGER DEFAULT 0,
    date DATE NOT NULL,
    CONSTRAINT unique_user_model_date UNIQUE (user_id, model_id, date)
);
```

2. **Update your API routes to increment the message count:**

In each of your API route files (e.g., `app/api/chat/anthropic/route.ts`, `app/api/chat/azure/route.ts`, etc.), add logic to increment the message count and check the limits before calling the third-party AI API.

3. **Display warnings and errors:**

Update your frontend code to display warnings when the message limit is close to being reached and errors when the limit is reached. This can be done by checking the remaining message count and updating the UI accordingly.
