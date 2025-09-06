import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useTheme } from '../context/ThemeContext'
import type { Member } from '../types/member'
// Chart data comes from backend records; do not use client-side mock fallback
import RecordLog from '../components/dashboard/RecordLog'
import ConfirmationModal from '../components/modals/ConfirmationModal'
import { FaTrashAlt,FaPlusCircle } from '../components/icons/CustomIcons'

export default function MemberDetail({ 
  member, 
  onBack, 
  onAddRecord,
  onRemoveMember 
}: {
  member: Member
  onBack: () => void
  onAddRecord: () => void
  onRemoveMember: (id: string) => void
}) {
  const [selectedMetric, setSelectedMetric] = useState('bp')
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const { isDarkMode } = useTheme()
  const [records, setRecords] = useState<any[]>([])
  const [loadingRecords, setLoadingRecords] = useState(false)
  const [recordsError, setRecordsError] = useState<string | null>(null)

  // fetch records from backend
  const loadRecords = async () => {
    setLoadingRecords(true)
    setRecordsError(null)
    try {
      const { memberService } = await import('../services/memberService')
      const res = await memberService.records(member.id as string)
      if (res.data) setRecords(res.data)
      else setRecordsError(res.error || `Status ${res.status}`)
    } catch (e: any) {
      setRecordsError(String(e))
    } finally {
      setLoadingRecords(false)
    }
  }

  // load on mount or when member changes
  useEffect(() => { void loadRecords() }, [member.id])

  const handleRemove = () => {
    setIsConfirmModalOpen(true)
  }

  const confirmRemove = () => {
    onRemoveMember(member.id as string)
    setIsConfirmModalOpen(false)
    onBack()
  }

  const metricName = selectedMetric === 'bp' ? 'Blood Pressure' : 
                    selectedMetric === 'weight' ? 'Weight' : 
                    selectedMetric === 'bmi' ? 'BMI' : 
                    selectedMetric === 'sugar' ? 'Blood Sugar' : 'Cholesterol'

  // convert backend records into chart data when using records from server
  const chartDataFromRecords = records.length > 0 ? (
    selectedMetric === 'bp' ?
      records
        .filter(r => r.bp)
        .map((r) => {
          const [s, d] = (r.bp || '0/0').split('/')
          return { date: new Date(r.lastUpdated).toLocaleDateString(), 'Systolic BP': Number(s), 'Diastolic BP': Number(d) }
        })
      :
      records
        .filter(r => r[selectedMetric] !== undefined && r[selectedMetric] !== null && r[selectedMetric] !== '')
        .map(r => ({ date: new Date(r.lastUpdated).toLocaleDateString(), [metricName]: parseFloat(r[selectedMetric]) }))
  ) : []

  const hasChartData = chartDataFromRecords.length > 0

  const yAxisLabel = selectedMetric === 'bp' ? 'mmHg' : 
                     selectedMetric === 'weight' ? 'kg' : 
                     selectedMetric === 'sugar' ? 'mg/dL' : 
                     selectedMetric === 'cholesterol' ? 'mg/dL' : ''

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="container mx-auto p-4 md:p-8 relative"
    >
      <div className="flex justify-between items-center mb-6">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors"
        >
          &larr; Back to Dashboard
        </motion.button>
        {member.id !== 'self' && (
          <motion.button
            onClick={handleRemove}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="py-2 px-4 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors flex items-center gap-2"
          >
            <FaTrashAlt />
            Remove Member
          </motion.button>
        )}
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-2">
        {member.name}
      </h1>
      <p className="text-lg text-gray-500 dark:text-gray-400 mb-8">
        Medical Record History
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none p-6 min-h-[400px]">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          {metricName} Trends
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['bp', 'weight', 'bmi', 'sugar', 'cholesterol'].map(metric => (
            <button
              key={metric}
              onClick={() => setSelectedMetric(metric)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedMetric === metric 
                  ? 'bg-blue-600 dark:bg-blue-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {metric === 'bp' ? 'Blood Pressure' : 
               metric === 'weight' ? 'Weight' : 
               metric === 'bmi' ? 'BMI' : 
               metric === 'sugar' ? 'Blood Sugar' : 'Cholesterol'}
            </button>
          ))}
        </div>

        {hasChartData ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartDataFromRecords} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? "#374151" : "#e5e7eb"} />
            <XAxis dataKey="date" stroke={isDarkMode ? "#9ca3af" : "#6b7280"} />
            <YAxis 
              label={{ 
                value: yAxisLabel, 
                angle: -90, 
                position: 'insideLeft', 
                dx: -10, 
                dy: 50 
              }} 
              stroke={isDarkMode ? "#9ca3af" : "#6b7280"} 
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDarkMode ? '#1f2937' : '#fff', 
                border: isDarkMode ? '1px solid #4b5563' : '1px solid #e5e7eb' 
              }} 
            />
            {selectedMetric === 'bp' ? (
              <>
                <Line type="monotone" dataKey="Systolic BP" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Diastolic BP" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
              </>
            ) : (
              <Line 
                type="monotone" 
                dataKey={metricName} 
                stroke="#8884d8" 
                activeDot={{ r: 8 }} 
                strokeWidth={2} 
              />
            )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="p-8 text-center text-gray-500 dark:text-gray-400">No {metricName} data available yet. Add a record to start tracking this metric.</div>
        )}
      </div>

      {loadingRecords ? (
        <p className="text-gray-500 dark:text-gray-400">Loading records...</p>
      ) : recordsError ? (
        <p className="text-red-500">Error loading records: {recordsError}</p>
      ) : (
        <RecordLog records={records.length > 0 ? records : []} onAddRecord={onAddRecord} />
      )}

      <motion.button
        onClick={onAddRecord}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all z-40"
      >
        <FaPlusCircle  />
      </motion.button>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={confirmRemove}
        title="Remove Member?"
        message={`Are you sure you want to remove ${member.name}? This action cannot be undone.`}
      />
    </motion.div>
  )
}