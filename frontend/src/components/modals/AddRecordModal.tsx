import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {type Member } from '../../types/member'
import { FaTrashAlt } from 'react-icons/fa'
import { apiService } from '../../services/apiService'
import { useToast } from '../../context/ToastContext'
import { useNavigate } from 'react-router-dom'
import {validateBp,validateCholesterol,validateSugar,validateWeight} from '../../utils/validation'
export default function AddRecordModal({
  isOpen,
  onClose,
  members,
}: {
  isOpen: boolean
  onClose: () => void
  members: Member[]
}) {
  const [selectedMember, setSelectedMember] = useState('')
  const [formData, setFormData] = useState({
    bp: '',
    weight: '',
    sugar: '',
    cholesterol: '',
  })
  const [visibleFields, setVisibleFields] = useState(['bp'])
  const showToast = useToast()
  const navigate = useNavigate()
  const availableFields = [
    { id: 'weight', label: 'Weight (kg)' },
    { id: 'sugar', label: 'Blood Sugar (mg/dL)' },
    { id: 'cholesterol', label: 'Cholesterol (mg/dL)' },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const addField = (fieldId: string) => {
    if (!visibleFields.includes(fieldId)) {
      setVisibleFields(prev => [...prev, fieldId])
    }
  }

  const removeField = (fieldId: string) => {
    setVisibleFields(prev => prev.filter(f => f !== fieldId))
    setFormData(prev => ({ ...prev, [fieldId]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedMember) {
      showToast('Please select a member.', 'error')
      return
    }
    if(formData.bp.trim() != "" && validateBp(formData.bp) !== ""){
      showToast(validateBp(formData.bp), 'error')
      return
    }
    if(formData.weight.trim() != "" && validateWeight(formData.weight) !== ""){
      showToast(validateWeight(formData.weight), 'error')
      return
    }
    if(formData.sugar.trim() != "" && validateSugar(formData.sugar) !== ""){
      showToast(validateSugar(formData.sugar), 'error')
      return
    }
    if(formData.cholesterol.trim() != "" && validateCholesterol(formData.cholesterol) !== ""){
      showToast(validateCholesterol(formData.cholesterol), 'error')
      return
    }
    const dataToSave = {
      ...Object.keys(formData).reduce((acc, key) => {
        if (visibleFields.includes(key)) {
          acc[key] = formData[key as keyof typeof formData]
        }
        return acc
      }, {} as Record<string, string>),
    }
    apiService.post(`/members/${selectedMember}/records`, dataToSave).then(() => {
    
      showToast('Record added successfully!', 'success')
      navigate(0) // refresh page to show new record
    }).catch(err => {
      console.error('Error saving record:', err)
    })
    
    onClose()
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50 dark:bg-gray-900 dark:bg-opacity-75"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        onClick={e => e.stopPropagation()}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
          Add New Medical Record
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="member" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
              Select Member
            </label>
            <select
              id="member"
              value={selectedMember}
              onChange={e => {setSelectedMember(e.target.value);
              }}
              className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="" disabled>-- Select a Member --</option>
              {members.map(member => (
                <option key={member.id} value={member.id}>
                  {member.name} ({member.relationshipAlias})
                </option>
              ))}
            </select>
          </div>

          <AnimatePresence mode="wait">
            {visibleFields.map(fieldId => (
              <motion.div
                key={fieldId}
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col overflow-hidden"
              >
                {fieldId === 'bp' ? (
                  <>
                    <label htmlFor="bp" className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                      Blood Pressure (e.g., 120/80)
                    </label>
                    <input
                      type="text"
                      id="bp"
                      name="bp"
                      value={formData.bp}
                      onChange={handleChange}
                      className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </>
                ) : (
                  <>
                    <label htmlFor={fieldId} className="font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center justify-between">
                      {availableFields.find(f => f.id === fieldId)?.label}
                      <motion.button
                        type="button"
                        onClick={() => removeField(fieldId)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FaTrashAlt />
                      </motion.button>
                    </label>
                    <input
                      type="number"
                      id={fieldId}
                      name={fieldId}
                      value={formData[fieldId as keyof typeof formData]}
                      onChange={handleChange}
                      className="p-3 rounded-lg border-2 border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    />
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>

          <div className="flex flex-wrap gap-2 mt-4">
            {availableFields
              .filter(f => !visibleFields.includes(f.id))
              .map(field => (
                <motion.button
                  key={field.id}
                  type="button"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addField(field.id)}
                  className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-semibold py-2 px-4 rounded-full transition-colors hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  {field.label}
                </motion.button>
              ))}
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-2 px-6 rounded-full"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-6 rounded-full"
            >
              Save Record
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}