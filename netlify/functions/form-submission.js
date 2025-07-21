exports.handler = async (event, context) => {
  // Only process POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the form data from Netlify
    const formData = JSON.parse(event.body);
    
    // Extract form fields
    const { name, email, organization, 'event-type': eventType, message } = formData;
    
    // Your Airtable configuration
    const AIRTABLE_BASE_ID = 'YOUR_BASE_ID_HERE'; // Replace with your base ID
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN; // We'll set this as environment variable
    const TABLE_NAME = 'Emotional AI Speaking Inquiries'; // Replace if your table name is different
    
    // Create the record for Airtable
    const record = {
      fields: {
        'Name': name || '',
        'Email': email || '',
        'Organization': organization || '',
        'Event Type': eventType || '',
        'Message': message || '',
        'Submission Date': new Date().toISOString(),
        'Status': 'New'
      }
    };

    // Send to Airtable
    const response = await fetch(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(record)
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const result = await response.json();
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        recordId: result.id 
      })
    };

  } catch (error) {
    console.error('Error processing form submission:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to process form submission' 
      })
    };
  }
};