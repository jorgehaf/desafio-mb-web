const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers || {})
    }
  }

  const response = await fetch(url, config)

  let data = null
  const contentType = response.headers.get('Content-Type') || ''
  if (contentType.includes('application/json')) {
    data = await response.json()
  } else {
    data = await response.text()
  }

  if (!response.ok) {
    const error = new Error(
      (data && data.message) || `Erro na requisição: ${response.status}`
    )
    error.status = response.status
    error.data = data
    throw error
  }

  return { data, status: response.status }
}

export const http = {
  get(path, options = {}) {
    return request(path, { ...options, method: 'GET' })
  },

  post(path, body, options = {}) {
    return request(path, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    })
  },

  put(path, body, options = {}) {
    return request(path, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    })
  },

  patch(path, body, options = {}) {
    return request(path, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body)
    })
  },

  delete(path, options = {}) {
    return request(path, { ...options, method: 'DELETE' })
  }
}
