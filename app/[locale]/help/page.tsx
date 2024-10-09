export default function HelpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
      <h1 className="text-2xl font-semibold mb-4">Need Help?</h1>
      <p className="text-lg text-gray-700">Please email</p>
      <a href="mailto:contact+aisupport@pixelverse.tech" className="text-blue-500 hover:underline">
        contact+aisupport@pixelverse.tech
      </a>
      </div>
    </div>
  )
}
