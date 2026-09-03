import { Check } from 'lucide-react'

const steps = [
  { id: 1, label: 'Search' },
  { id: 2, label: 'Select Flight' },
  { id: 3, label: 'Passengers' },
  { id: 4, label: 'Payment' },
  { id: 5, label: 'Confirmation' },
]

export default function StepIndicator({ currentStep }) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0">
          <div
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => {
          const isCompleted = step.id < currentStep
          const isCurrent = step.id === currentStep

          return (
            <div key={step.id} className="flex flex-col items-center gap-2 z-10">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300
                ${isCompleted ? 'bg-blue-600 text-white' : ''}
                ${isCurrent ? 'bg-blue-600 text-white ring-4 ring-blue-100' : ''}
                ${!isCompleted && !isCurrent ? 'bg-white text-gray-400 border-2 border-gray-200' : ''}
              `}>
                {isCompleted ? <Check className="w-4 h-4" /> : step.id}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-gray-700' : 'text-gray-400'}`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
