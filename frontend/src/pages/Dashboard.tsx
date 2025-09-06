import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Member } from '../types/member'
import MemberCard from '../components/dashboard/MemberCard'
import AddMemberCard from '../components/dashboard/AddMemberCard'
import AddRecordModal from '../components/modals/AddRecordModal'
import AddMemberModal from '../components/modals/AddMemberModal'
// import { initialMembers } from '../utils/mockData'
import { memberService } from '../services/memberService'
import { FaPlusCircle } from '../components/icons/CustomIcons'
import { FaUserCircle } from 'react-icons/fa'
import ThemeToggle from '../components/ui/ThemeToggle'
import MemberDetail from './MemberDetail'
import { useToast } from '../context/ToastContext'
import { useNavigate } from 'react-router-dom'
export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast()
  const [members, setMembers] = useState<Member[]>([])
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [isAddRecordModalOpen, setIsAddRecordModalOpen] = useState(false)
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleSelectMember = (member: Member) => {
    setSelectedMember(member)
  }

  const handleBackToDashboard = () => {
    setSelectedMember(null)
  }

  const handleRemoveMember = (memberId: string) => {
    memberService.remove(memberId).then(() => {
      setMembers(prev => prev.filter(m => m.id !== memberId))
    })
  }

  const handleAddMember = (newMember: Member) => {
    memberService.create(newMember).then(res => {
      if (res.data) {
        toast('Member added successfully! Invitation sent if email is valid.', 'success')}
      else
        toast(res.error || 'Failed to add member', 'error')
    })
  }

  useEffect(() => {
    setLoading(true)
    memberService.list().then(res => {
      setLoading(false)
      if (res.data) setMembers(res.data as Member[])
      else setError(res.error || 'Failed to load members')
    }).catch(err => {
      console.error('Error fetching members:', err)
      setLoading(false)
      setError('Failed to load members')
    })
  }, [])

  return (
    <>
      <AnimatePresence>
        {selectedMember ? (
          <MemberDetail 
            member={selectedMember} 
            onBack={handleBackToDashboard}
            onAddRecord={() => setIsAddRecordModalOpen(true)}
            onRemoveMember={handleRemoveMember}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="container mx-auto p-4 md:p-8 relative"
          >
            <div className="flex justify-between items-center mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-gray-200 mb-2">
                  Welcome back!
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Here's a quick look at your family's health snapshots.
                </p>
              </div>
              <div className="flex gap-4">
                <ThemeToggle />
                <motion.button
                  onClick={() => navigate('/account')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="py-2 px-4 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 transition-colors flex items-center gap-2"
                >
                  <FaUserCircle className="text-xl" />
                  Account
                </motion.button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {loading ? (
                <div>Loading members...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <AnimatePresence>
                  {members.map(member => (
                    <MemberCard 
                      key={member.id} 
                      member={member} 
                      onClick={handleSelectMember} 
                    />
                  ))}
                  <AddMemberCard onClick={() => setIsAddMemberModalOpen(true)} />
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsAddRecordModalOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all z-40"
      >
        <FaPlusCircle  />
      </motion.button>

      <AddRecordModal 
        isOpen={isAddRecordModalOpen} 
        onClose={() => setIsAddRecordModalOpen(false)} 
        members={members} 
      />
      
      <AddMemberModal 
        isOpen={isAddMemberModalOpen} 
        onClose={() => setIsAddMemberModalOpen(false)}
        onAddMember={handleAddMember}
      />
    </>
  )
}