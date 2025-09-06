import { MdEvent } from 'react-icons/md'

export default function AccountForm({
  details,
  isEditing,
  onFieldChange,
}: {
  details: {
    name?: string
    email?: string
    dateOfBirth?: string
    gender?: string
    height?: number
    weight?: number
  }
  isEditing: boolean
  onFieldChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {
  const formattedDob = details.dateOfBirth
    ? new Date(details.dateOfBirth).toLocaleDateString()
    : ''
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
      <div className="flex flex-col">
        <label htmlFor="name" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={details.name}
          onChange={onFieldChange}
          readOnly={!isEditing}
          className={`p-3 rounded-lg border-2 ${
            isEditing
              ? 'border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              : 'border-transparent text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900'
          } transition duration-200`}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={details.email}
          readOnly
          className="p-3 rounded-lg border-2 border-transparent text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="dob" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Date of Birth
        </label>
        <div>
          {isEditing ? (
            <div className="relative">
              <input
                type="date"
                id="dob"
                name="dateOfBirth"
                value={details.dateOfBirth}
                onChange={onFieldChange}
                className={`w-full p-3 pl-12 rounded-lg border-2 ${
                  'border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
                } transition duration-200`}
              />
              <MdEvent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
            </div>
          ) : (
            <div className="relative">
              <div className="p-3 pl-12 rounded-lg border-2 border-transparent bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                <MdEvent className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
                <span className="text-sm">{formattedDob || 'Not set'}</span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <label htmlFor="gender" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Gender
        </label>
        <select
          id="gender"
          name="gender"
          value={details.gender}
          onChange={onFieldChange}
          disabled={!isEditing}
          className={`p-3 rounded-lg border-2 ${
            isEditing
              ? 'border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              : 'border-transparent text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900'
          } transition duration-200`}
        >
          <option value="">Select...</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="height" className="font-medium text-gray-700 dark:text-gray-300 mb-1">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          name="height"
          value={details.height}
          onChange={onFieldChange}
          readOnly={!isEditing}
          className={`p-3 rounded-lg border-2 ${
            isEditing
              ? 'border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 text-gray-800 dark:text-gray-200'
              : 'border-transparent text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900'
          } transition duration-200`}
        />
      </div>
      
    </div>
  )
}