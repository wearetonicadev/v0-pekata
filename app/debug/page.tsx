export default function DebugPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Environment Variables</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Environment Variables:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            NEXT_PUBLIC_BASE_URL: {process.env.NEXT_PUBLIC_BASE_URL || 'NOT SET'}
            {'\n'}NODE_ENV: {process.env.NODE_ENV || 'NOT SET'}
            {'\n'}VERCEL_URL: {process.env.VERCEL_URL || 'NOT SET'}
          </pre>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">API Test:</h2>
          <button 
            onClick={async () => {
              const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
              console.log('Testing API with base URL:', baseUrl)
              
              try {
                const response = await fetch(`${baseUrl}/api/dashboard/metrics`)
                const data = await response.json()
                console.log('API Response:', data)
                alert('API call successful! Check console for data.')
              } catch (error) {
                console.error('API Error:', error)
                alert('API call failed! Check console for error.')
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test API Call
          </button>
        </div>
        
        <div>
          <h2 className="text-lg font-semibold">Current Base URL Logic:</h2>
          <pre className="bg-gray-100 p-4 rounded">
            {`const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            
Result: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}`}
          </pre>
        </div>
      </div>
    </div>
  )
}
