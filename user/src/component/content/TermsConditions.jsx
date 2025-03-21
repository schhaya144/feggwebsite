import React from 'react'
import Payment from './Payment'

const TermsConditions = () => {
  return (
    <div className="px-4 md:px-16 p-6 bg-white shadow-xs rounded-lg  mt-28">
      <h2 className="text-3xl font-semibold text-green-600 mb-4">Terms and Conditions</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Purpose</h3>
        <p className="text-gray-700">
          The Oxivan Environment Protection Committee is an independent, self-motivated platform established solely to prevent environmental pollution. We are not affiliated with any disputes or controversies.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">2. Dispute Resolution</h3>
        <p className="text-gray-700">
        If any individual generates a dispute, they will be solely responsible for it. Therefore, we request and advise that you avoid any current or future disputes.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Misconduct</h3>
        <p className="text-gray-700">
          If any individual provides false information, incorrect updates, or engages in misconduct, the Oxivan Environment Protection Committee reserves the right to immediately suspend or ban them from future benefits. This decision will be final and binding.
        </p>
      </div>
      <Payment/>
    </div>

  )
}

export default TermsConditions