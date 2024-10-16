const API_URL = 'http://localhost:3000';

export const createPin = async (pinData) => {
  const response = await fetch(`${API_URL}/pins`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',  // Add this header
    },
    body: JSON.stringify(pinData),
  });

  if (!response.ok) {
    throw new Error('Failed to create pin');
  }

  return response.json();
};

export const fetchPins = async () => {
  const response = await fetch(`${API_URL}/pins`, {
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pins');
  }

  return response.json();
};

export const updatePin = async (pinId, pinData) => {
  const response = await fetch(`${API_URL}/pins/${pinId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(pinData),
  });

  if (!response.ok) {
    throw new Error('Failed to update pin');
  }

  return response.json();
};

export const deletePin = async (pinId) => {
  const response = await fetch(`${API_URL}/pins/${pinId}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error('Failed to delete pin');
  }

  return response.json();
};