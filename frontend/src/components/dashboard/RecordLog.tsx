import { motion } from 'framer-motion'
import { LucideHeartPulse, LucideDroplets, LucideWeight, LucideFileText, LucidePlusCircle } from 'lucide-react'
import ChangeIndicator from './ChangeIndicator'
import { format } from 'date-fns';
interface Record {
  bp: string
  weight: string
  bmi: string
  sugar: string
  cholesterol: string,
  createdAt?: string,
  lastUpdated?: string,
}

export default function RecordLog({ records, onAddRecord }: { records: Record[]; onAddRecord?: () => void }) {
  if (records.length === 0) {
    return (
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border-2 border-dashed border-gray-200 dark:border-gray-700 p-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="w-20 h-20 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
            <LucideFileText size={36} className="text-blue-600 dark:text-blue-300" />
          </div>
          <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200">No medical records yet</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xl">You haven't added any medical records for this member. Records help track trends and spot changes over time.</p>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onAddRecord && onAddRecord()}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-sm"
            >
              <LucidePlusCircle size={16} />
              Add first record
            </button>
            <button
              onClick={() => { navigator.clipboard?.writeText('Tip: measure BP, weight and sugar regularly') }}
              className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-2 rounded-lg"
            >
              How to measure
            </button>
          </div>
        </div>
      </div>
    )
  }

  const getIconForMetric = (metric: string) => {
    switch (metric) {
      case 'bp': return <LucideHeartPulse size={16} />
      case 'weight': return <LucideWeight size={16} />
      case 'sugar': return <LucideDroplets size={16} />
      case 'cholesterol': return <LucideHeartPulse size={16} />
      default: return null
    }
  }

  const getLabelForMetric = (metric: string) => {
    switch (metric) {
      case 'bp': return 'Blood Pressure'
      case 'weight': return 'Weight'
      case 'sugar': return 'Blood Sugar'
      case 'cholesterol': return 'Cholesterol'
      default: return ''
    }
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Record History</h3>
      <div className="flex flex-col gap-4 max-h-[400px] overflow-y-auto custom-scrollbar">
        {records.map((record, index) => {
          const previousRecord = records[index + 1]
          const metrics = Object.keys(record).filter(key => key !== 'lastUpdated' && key !== 'createdAt' && key !== 'bmi' && key !== "memberId")
          
          return (
            <motion.div
              key={index} 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-none border-2 border-gray-100 dark:border-gray-700 p-4 transition-all duration-300 transform"
            >
              <div className="absolute top-4 right-4 text-xs font-semibold text-gray-400 dark:text-gray-500">
                {format(new Date(record.lastUpdated as string), "EEEE, MMMM d, yyyy h:mm a")}
              </div>
              <h4 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
                Record #{records.length - index}
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-4 gap-x-2">
                {metrics.map((metric, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center text-gray-500 dark:text-gray-400 mb-1">
                      {getIconForMetric(metric)}
                      <span className="ml-1 text-xs font-medium">{getLabelForMetric(metric)}</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                      {record[metric as keyof Record]}
                      <span className="ml-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                        {metric === 'weight' ? 'kg' : metric === 'bp' ? 'mmHg' : ''}
                      </span>
                      <ChangeIndicator 
                        current={record[metric as keyof Record] ?? ""} 
                        previous={previousRecord?.[metric as keyof Record]} 
                        isBp={metric === 'bp'} 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}